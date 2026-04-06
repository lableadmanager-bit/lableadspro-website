#!/usr/bin/env python3
"""
Lab Leads Pro — Email Drip Engine (Supabase-backed)

Standalone script that runs via cron on the Mac mini.
Loads contacts from Supabase, checks suppression list, determines what to send,
sends via Resend API, and logs sends back to Supabase.

Designed to run every 30 minutes during business hours (8 AM - 5 PM ET)
via cron, sending a small batch each run to spread emails naturally
across the day instead of blasting all at once.

Usage:
    python3 scripts/email-drip.py                                    # Normal run (sends --per-run batch)
    python3 scripts/email-drip.py --dry-run                          # Preview without sending
    python3 scripts/email-drip.py --test-email george@lableadspro.com # Redirect all to test address
    python3 scripts/email-drip.py --max-sends 50 --per-run 3         # 50/day limit, 3 per cron run
"""

import argparse
import hashlib
import hmac
import json
import os
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta

# Use ET for daily counters so it matches what George sees in Resend
ET = timezone(timedelta(hours=-4))  # EDT
from pathlib import Path

# --- Configuration ---

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
if not RESEND_API_KEY:
    resend_key_path = os.path.expanduser("~/.config/resend/api_key")
    if os.path.exists(resend_key_path):
        with open(resend_key_path) as f:
            RESEND_API_KEY = f.read().strip()

UNSUBSCRIBE_SECRET = os.environ.get("UNSUBSCRIBE_SECRET", "3331bc0adabfa9e55d16e949c71af500d1bf2d8c6300b4992c27bc66bdf37c30")
FROM_EMAIL = "Lab Leads Pro <freshleads@lableadspro.com>"
SITE_URL = "https://lableadspro.com"

# Supabase config
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
if not SUPABASE_URL or not SUPABASE_KEY:
    env_path = os.path.expanduser("~/.openclaw/workspace/lableadspro-website/.env.local")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line.startswith("NEXT_PUBLIC_SUPABASE_URL="):
                    SUPABASE_URL = line.split("=", 1)[1]
                elif line.startswith("SUPABASE_SERVICE_ROLE_KEY="):
                    SUPABASE_KEY = line.split("=", 1)[1]

# Paths
SCRIPT_DIR = Path(__file__).resolve().parent
TEMPLATE_DIR = SCRIPT_DIR / "email-templates"
WORKSPACE_DIR = SCRIPT_DIR.parent.parent
DATA_DIR = WORKSPACE_DIR / "data" / "email-marketing"
DAILY_COUNTER_FILE = DATA_DIR / "daily-send-count.json"

# Sequence definitions
SEQUENCES = {
    "cold-grinder": {
        "days": [0, 7, 14, 21, 28],
        "template_prefix": "cold-grinder",
        "subjects": [
            "Fresh Leads",
            "525,000 grants. One search bar.",
            "New labs are the hottest leads in equipment sales",
            "NIH is only one piece of the puzzle",
            "Free NIH Reporter Guide",
        ],
    },
    "cold-broken-promises": {
        "days": [0, 7, 14, 21, 28],
        "template_prefix": "cold-broken-promises",
        "subjects": [
            "Fresh Leads",
            "Enterprise level intelligence, built for the individual rep",
            "New Lab Leads",
            "Build your own pipeline. Stop waiting for theirs.",
            "Free NIH Reporter Guide",
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


# --- Supabase helpers ---

def supabase_request(path, method="GET", data=None, params=None):
    """Make a request to Supabase REST API."""
    url = f"{SUPABASE_URL}/rest/v1/{path}"
    if params:
        url += "?" + "&".join(f"{k}={v}" for k, v in params.items())

    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }
    if method == "GET":
        headers["Accept"] = "application/json"
    if method in ("POST", "PATCH"):
        headers["Prefer"] = "return=representation"

    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        print(f"  Supabase error ({method} {path}): {e.code} {err}")
        return None


def fetch_active_contacts():
    """Fetch all active contacts from Supabase, shuffled for fair A/B distribution."""
    import random
    contacts = supabase_request("drip_contacts", params={
        "select": "*",
        "status": "eq.active",
        "enrolled_at": "not.is.null",
    })
    result = contacts or []
    random.shuffle(result)
    return result


def fetch_suppressed_emails():
    """Fetch all suppressed emails from Supabase."""
    rows = supabase_request("email_suppressions", params={
        "select": "email",
    })
    if not rows:
        return set()
    return {r["email"].lower() for r in rows}


def update_contact_after_send(contact_id, step, now_iso, completed=False):
    """Update a contact's step and last_sent_at in Supabase."""
    patch = {
        "step": step,
        "last_sent_at": now_iso,
    }
    if completed:
        patch["status"] = "completed"
    supabase_request(
        f"drip_contacts?id=eq.{contact_id}",
        method="PATCH",
        data=patch,
    )


def suppress_contact(contact_id):
    """Mark a contact as unsubscribed in Supabase."""
    supabase_request(
        f"drip_contacts?id=eq.{contact_id}",
        method="PATCH",
        data={"status": "unsubscribed"},
    )


def log_send(contact_id, email, sequence, step, subject, resend_email_id=None):
    """Log a send to Supabase drip_send_log."""
    supabase_request("drip_send_log", method="POST", data={
        "contact_id": contact_id,
        "email": email,
        "sequence": sequence,
        "step": step,
        "subject": subject,
        "resend_email_id": resend_email_id,
    })


# --- Email helpers ---

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
    state = contact.get("state", "") or ""

    replacements = {
        "{{first_name}}": contact.get("first_name") or "there",
        "{{email}}": contact["email"],
        "{{state}}": state,
        "{{company}}": contact.get("company") or "",
        "{{unsubscribe_url}}": unsubscribe_url,
        "{{token}}": generate_unsubscribe_token(contact["email"]),
    }

    result = template
    for key, value in replacements.items():
        result = result.replace(key, value)
    return result


def get_subject(sequence: str, step: int, contact: dict) -> str:
    """Get the subject line for a given sequence step."""
    seq_config = SEQUENCES[sequence]
    subject = seq_config["subjects"][step]
    subject = subject.replace("{{state}}", contact.get("state") or "")
    subject = subject.replace("{{first_name}}", contact.get("first_name") or "there")
    return subject


def should_send(contact: dict, now: datetime) -> bool:
    """Determine if a contact should receive their next email."""
    sequence = contact["sequence"]
    step = contact["step"]
    seq_config = SEQUENCES.get(sequence)

    if not seq_config:
        return False

    if step >= len(seq_config["days"]):
        return False

    enrolled_at = datetime.fromisoformat(contact["enrolled_at"].replace("Z", "+00:00"))
    target_day = seq_config["days"][step]
    days_since_enrollment = (now - enrolled_at).total_seconds() / 86400

    if days_since_enrollment < target_day:
        return False

    if contact.get("last_sent_at"):
        last_sent = datetime.fromisoformat(contact["last_sent_at"].replace("Z", "+00:00"))
        hours_since_last = (now - last_sent).total_seconds() / 3600
        if hours_since_last < 20:
            return False

    return True


def send_email(to: str, subject: str, html: str, test_email: str = None):
    """Send an email via Resend API. Returns (success, email_id)."""
    if not RESEND_API_KEY:
        print("  ERROR: RESEND_API_KEY not set")
        return False, None

    actual_to = test_email if test_email else to

    # Build unsubscribe URL for List-Unsubscribe header
    unsub_token = hmac.new(
        UNSUBSCRIBE_SECRET.encode(), to.lower().encode(), hashlib.sha256
    ).hexdigest()
    unsub_url = f"{SITE_URL}/api/unsubscribe?email={urllib.request.quote(to)}&token={unsub_token}"

    payload = json.dumps({
        "from": FROM_EMAIL,
        "reply_to": "freshleads@lableadspro.com",
        "to": [actual_to],
        "subject": subject,
        "html": html,
        "headers": {
            "List-Unsubscribe": f"<{unsub_url}>",
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
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
            body = json.loads(resp.read().decode())
            return True, body.get("id")
    except urllib.error.HTTPError as e:
        print(f"  ERROR sending to {actual_to}: {e.code} {e.reason}")
        return False, None
    except Exception as e:
        print(f"  ERROR sending to {actual_to}: {e}")
        return False, None


def get_daily_send_count(now: datetime) -> int:
    """Get how many emails we've already sent today (local file for speed)."""
    if not DAILY_COUNTER_FILE.exists():
        return 0
    try:
        data = json.loads(DAILY_COUNTER_FILE.read_text())
        if data.get("date") == now.strftime("%Y-%m-%d"):
            return data.get("count", 0)
        return 0
    except (json.JSONDecodeError, KeyError):
        return 0


def update_daily_send_count(now: datetime, new_sends: int):
    """Update the daily send counter."""
    current = get_daily_send_count(now)
    DAILY_COUNTER_FILE.parent.mkdir(parents=True, exist_ok=True)
    DAILY_COUNTER_FILE.write_text(json.dumps({
        "date": now.strftime("%Y-%m-%d"),
        "count": current + new_sends,
        "last_updated": now.isoformat(),
    }, indent=2) + "\n")


def main():
    parser = argparse.ArgumentParser(description="Lab Leads Pro Email Drip Engine")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be sent without sending")
    parser.add_argument("--test-email", type=str, help="Send all emails to this address instead")
    parser.add_argument("--max-sends", type=int, default=50, help="Maximum emails to send per DAY (default: 50)")
    parser.add_argument("--per-run", type=int, default=0, help="Max emails per cron run (0 = use max-sends)")
    args = parser.parse_args()

    now = datetime.now(ET)
    print(f"[{now.isoformat()}] Email drip engine starting...")
    print(f"  Template dir: {TEMPLATE_DIR}")
    print(f"  Supabase: {'connected' if SUPABASE_URL else 'NOT CONFIGURED'}")

    if not SUPABASE_URL or not SUPABASE_KEY:
        print("  FATAL: Supabase credentials not found. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.")
        sys.exit(1)

    if args.dry_run:
        print("  MODE: DRY RUN — no emails will be sent")
    if args.test_email:
        print(f"  MODE: TEST — all emails redirected to {args.test_email}")

    # Daily send budget
    daily_sent = get_daily_send_count(now)
    daily_remaining = max(0, args.max_sends - daily_sent)
    run_limit = min(args.per_run, daily_remaining) if args.per_run > 0 else daily_remaining

    print(f"  Daily limit: {args.max_sends} | Sent today: {daily_sent} | This run: up to {run_limit}")

    if run_limit <= 0 and not args.test_email:
        print(f"  Daily limit reached ({args.max_sends}). Nothing to send.")
        return

    # Load from Supabase
    contacts = fetch_active_contacts()
    suppressed_emails = fetch_suppressed_emails()

    print(f"  Loaded {len(contacts)} active contacts, {len(suppressed_emails)} suppressed emails")

    sends = 0
    errors = 0
    skipped = 0

    for contact in contacts:
        if sends >= run_limit:
            print(f"  Reached run limit ({run_limit}), stopping. Will continue next run.")
            break

        email = contact["email"].lower()
        contact_id = contact["id"]

        # Check suppression
        if email in suppressed_emails:
            suppress_contact(contact_id)
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
            success, resend_email_id = send_email(email, subject, html, args.test_email)
            if success:
                sends += 1
                new_step = step + 1
                completed = new_step >= len(seq_config["days"])

                # Update Supabase
                update_contact_after_send(contact_id, new_step, now.isoformat(), completed)
                log_send(contact_id, email, sequence, new_step, subject, resend_email_id)
            else:
                errors += 1
        else:
            sends += 1

    # Update local daily counter
    if not args.dry_run and sends > 0:
        update_daily_send_count(now, sends)

    total_today = daily_sent + sends
    print(f"\nDone: {sends} sent this run, {errors} errors, {skipped} suppressed")
    print(f"Daily total: {total_today}/{args.max_sends}")


if __name__ == "__main__":
    main()
