#!/usr/bin/env python3
"""
Lab Leads Pro — Email Drip Engine

Standalone script that runs via cron on the Mac mini.
Loads contacts, checks suppression list, determines what to send,
sends via Resend API, and logs sends.

Usage:
    python3 scripts/email-drip.py
    python3 scripts/email-drip.py --dry-run
    python3 scripts/email-drip.py --test-email george@lableadspro.com
    python3 scripts/email-drip.py --dry-run --max-sends 10
"""

import argparse
import hashlib
import hmac
import json
import os
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone
from pathlib import Path

# --- Configuration ---

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
UNSUBSCRIBE_SECRET = os.environ.get("UNSUBSCRIBE_SECRET", "default-unsubscribe-secret")
FROM_EMAIL = "Lab Leads Pro <freshleads@lableadspro.com>"
SITE_URL = "https://lableadspro.com"

# Paths — relative to the workspace root (parent of lableadspro-website)
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
WORKSPACE_DIR = PROJECT_DIR.parent
DATA_DIR = WORKSPACE_DIR / "data" / "email-marketing"
TEMPLATE_DIR = SCRIPT_DIR / "email-templates"

CONTACTS_FILE = DATA_DIR / "contacts.json"
SUPPRESSION_FILE = DATA_DIR / "suppression-list.json"
SEND_LOG_FILE = DATA_DIR / "send-log.jsonl"

# Sequence definitions: sequence_name -> list of day offsets
SEQUENCES = {
    "cold-grinder": {
        "days": [0, 3, 6, 10, 14],
        "template_prefix": "cold-grinder",
        "subjects": [
            "You're probably tracking NIH grants manually",
            "6 hours/week × 50 weeks = 300 hours of prospecting",
            "The $2M grant you didn't know about",
            "Built by a rep, for reps",
            "Last one from me",
        ],
    },
    "cold-skimmer": {
        "days": [0, 3, 6, 10, 14],
        "template_prefix": "cold-skimmer",
        "subjects": [
            "Funded labs are buying equipment — and nobody's calling them",
            "$47M in equipment grants were awarded last quarter",
            "What if someone just handed you a list of buyers?",
            "Your competitors are already tracking this data",
            "Quick question, then I'm out",
        ],
    },
    "warm-sample": {
        "days": [0, 2, 5, 9, 14, 21],
        "template_prefix": "warm-sample",
        "subjects": [
            "Your Lab Leads Pro sample report",
            "Did anything in that report surprise you?",
            "New equipment grants this week",
            "One deal pays for a full year",
            "How a rep found a $400K deal in their first report",
            "Still thinking about it?",
        ],
    },
}


def load_json(filepath: Path, default=None):
    if default is None:
        default = []
    if not filepath.exists():
        return default
    with open(filepath, "r") as f:
        return json.load(f)


def save_json(filepath: Path, data):
    filepath.parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, "w") as f:
        json.dump(data, f, indent=2)
        f.write("\n")


def append_jsonl(filepath: Path, entry: dict):
    filepath.parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, "a") as f:
        f.write(json.dumps(entry) + "\n")


def generate_unsubscribe_token(email: str) -> str:
    return hmac.new(
        UNSUBSCRIBE_SECRET.encode(), email.lower().encode(), hashlib.sha256
    ).hexdigest()


def build_unsubscribe_url(email: str) -> str:
    token = generate_unsubscribe_token(email)
    return f"{SITE_URL}/api/unsubscribe?email={urllib.request.quote(email)}&token={token}"


def load_template(sequence: str, step: int) -> str:
    seq_config = SEQUENCES[sequence]
    filename = f"{seq_config['template_prefix']}-{step + 1}.html"
    template_path = TEMPLATE_DIR / filename
    if not template_path.exists():
        raise FileNotFoundError(f"Template not found: {template_path}")
    with open(template_path, "r") as f:
        return f.read()


def render_template(template: str, contact: dict) -> str:
    """Replace template variables with contact data."""
    unsubscribe_url = build_unsubscribe_url(contact["email"])
    state = contact.get("state", "")
    states_of_interest = contact.get("states_of_interest", [])
    primary_state = states_of_interest[0] if states_of_interest else state

    replacements = {
        "{{first_name}}": contact.get("first_name", "there"),
        "{{email}}": contact["email"],
        "{{state}}": primary_state,
        "{{company}}": contact.get("company", ""),
        "{{unsubscribe_url}}": unsubscribe_url,
        "{{token}}": generate_unsubscribe_token(contact["email"]),
    }

    result = template
    for key, value in replacements.items():
        result = result.replace(key, value)
    return result


def get_subject(sequence: str, step: int, contact: dict) -> str:
    """Get the subject line for a given sequence step, with variable replacement."""
    seq_config = SEQUENCES[sequence]
    subject = seq_config["subjects"][step]
    states_of_interest = contact.get("states_of_interest", [])
    primary_state = states_of_interest[0] if states_of_interest else contact.get("state", "")
    subject = subject.replace("{{state}}", primary_state)
    subject = subject.replace("{{first_name}}", contact.get("first_name", "there"))
    return subject


def should_send(contact: dict, now: datetime) -> bool:
    """Determine if a contact should receive their next email."""
    if contact["status"] != "active":
        return False

    sequence = contact["sequence"]
    step = contact["step"]
    seq_config = SEQUENCES.get(sequence)

    if not seq_config:
        return False

    # Already completed all steps
    if step >= len(seq_config["days"]):
        return False

    enrolled_at = datetime.fromisoformat(contact["enrolled_at"].replace("Z", "+00:00"))
    target_day = seq_config["days"][step]
    days_since_enrollment = (now - enrolled_at).total_seconds() / 86400

    # Not yet time for this step
    if days_since_enrollment < target_day:
        return False

    # Don't send more than once per day
    if contact.get("last_sent_at"):
        last_sent = datetime.fromisoformat(contact["last_sent_at"].replace("Z", "+00:00"))
        hours_since_last = (now - last_sent).total_seconds() / 3600
        if hours_since_last < 20:  # minimum 20 hours between sends
            return False

    return True


def send_email(to: str, subject: str, html: str, test_email: str = None) -> bool:
    """Send an email via Resend API."""
    if not RESEND_API_KEY:
        print("  ERROR: RESEND_API_KEY not set")
        return False

    actual_to = test_email if test_email else to

    payload = json.dumps({
        "from": FROM_EMAIL,
        "to": [actual_to],
        "subject": subject,
        "html": html,
    }).encode()

    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=payload,
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "LabLeadsPro/1.0",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status == 200
    except urllib.error.HTTPError as e:
        print(f"  ERROR sending to {actual_to}: {e.code} {e.reason}")
        return False
    except Exception as e:
        print(f"  ERROR sending to {actual_to}: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Lab Leads Pro Email Drip Engine")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be sent without sending")
    parser.add_argument("--test-email", type=str, help="Send all emails to this address instead")
    parser.add_argument("--max-sends", type=int, default=50, help="Maximum emails to send per run (default: 50)")
    args = parser.parse_args()

    now = datetime.now(timezone.utc)
    print(f"[{now.isoformat()}] Email drip engine starting...")
    print(f"  Data dir: {DATA_DIR}")
    print(f"  Template dir: {TEMPLATE_DIR}")

    if args.dry_run:
        print("  MODE: DRY RUN — no emails will be sent")
    if args.test_email:
        print(f"  MODE: TEST — all emails redirected to {args.test_email}")

    # Load data
    contacts = load_json(CONTACTS_FILE, [])
    suppression_list = load_json(SUPPRESSION_FILE, [])
    suppressed_emails = {entry["email"].lower() for entry in suppression_list}

    print(f"  Loaded {len(contacts)} contacts, {len(suppressed_emails)} suppressed emails")

    sends = 0
    errors = 0
    skipped = 0

    for i, contact in enumerate(contacts):
        if sends >= args.max_sends:
            print(f"  Reached max sends ({args.max_sends}), stopping.")
            break

        email = contact["email"].lower()

        # Check suppression
        if email in suppressed_emails:
            if contact["status"] != "unsubscribed":
                contacts[i]["status"] = "unsubscribed"
            skipped += 1
            continue

        # Check if should send
        if not should_send(contact, now):
            continue

        sequence = contact["sequence"]
        step = contact["step"]
        seq_config = SEQUENCES[sequence]

        try:
            template = load_template(sequence, step)
            html = render_template(template, contact)
            subject = get_subject(sequence, step, contact)
        except FileNotFoundError as e:
            print(f"  SKIP {email}: {e}")
            errors += 1
            continue

        step_label = f"{sequence} step {step + 1}/{len(seq_config['days'])}"
        print(f"  {'[DRY RUN] Would send' if args.dry_run else 'Sending'}: {email} — {step_label} — \"{subject}\"")

        if not args.dry_run:
            success = send_email(email, subject, html, args.test_email)
            if success:
                sends += 1
                contacts[i]["step"] = step + 1
                contacts[i]["last_sent_at"] = now.isoformat()
                if step + 1 >= len(seq_config["days"]):
                    contacts[i]["status"] = "completed"

                # Log the send
                append_jsonl(SEND_LOG_FILE, {
                    "email": email,
                    "sequence": sequence,
                    "step": step + 1,
                    "subject": subject,
                    "sent_at": now.isoformat(),
                    "test_email": args.test_email or None,
                })
            else:
                errors += 1
        else:
            sends += 1

    # Save updated contacts
    if not args.dry_run:
        save_json(CONTACTS_FILE, contacts)

    print(f"\nDone: {sends} sent, {errors} errors, {skipped} suppressed")


if __name__ == "__main__":
    main()
