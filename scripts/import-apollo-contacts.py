#!/usr/bin/env python3
"""
Lab Leads Pro — Apollo CSV Contact Importer

Imports contacts from an Apollo CSV export, assigns A/B variants,
deduplicates, and adds to the email marketing contacts list.

Usage:
    python3 scripts/import-apollo-contacts.py path/to/apollo-export.csv
    python3 scripts/import-apollo-contacts.py path/to/apollo-export.csv --dry-run
"""

import argparse
import csv
import json
import random
import sys
from datetime import datetime, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
WORKSPACE_DIR = PROJECT_DIR.parent
DATA_DIR = WORKSPACE_DIR / "data" / "email-marketing"

CONTACTS_FILE = DATA_DIR / "contacts.json"
SUPPRESSION_FILE = DATA_DIR / "suppression-list.json"


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


def normalize_email(email: str) -> str:
    return email.strip().lower()


def find_csv_field(row: dict, candidates: list[str]) -> str:
    """Find a value from a row trying multiple possible column names."""
    for key in candidates:
        for row_key in row:
            if row_key.strip().lower() == key.lower():
                val = row[row_key].strip()
                if val:
                    return val
    return ""


def parse_apollo_csv(csv_path: str) -> list[dict]:
    """Parse Apollo CSV export into contact records."""
    contacts = []
    with open(csv_path, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = find_csv_field(row, ["email", "Email", "Email Address", "Work Email", "Contact Email"])
            if not email or "@" not in email:
                continue

            first_name = find_csv_field(row, ["first_name", "First Name", "First name", "firstName"])
            company = find_csv_field(row, ["company", "Company", "Company Name", "Organization"])
            state = find_csv_field(row, ["state", "State", "Person State", "State/Region", "HQ State"])

            contacts.append({
                "email": normalize_email(email),
                "first_name": first_name or "there",
                "company": company,
                "state": state.upper()[:2] if state else "",
            })

    return contacts


def main():
    parser = argparse.ArgumentParser(description="Import Apollo contacts for Lab Leads Pro email sequences")
    parser.add_argument("csv_file", help="Path to Apollo CSV export")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be imported without saving")
    parser.add_argument("--seed", type=int, default=None, help="Random seed for reproducible A/B assignment")
    args = parser.parse_args()

    if not Path(args.csv_file).exists():
        print(f"Error: File not found: {args.csv_file}")
        sys.exit(1)

    if args.seed is not None:
        random.seed(args.seed)

    now = datetime.now(timezone.utc).isoformat()

    # Load existing data
    existing_contacts = load_json(CONTACTS_FILE, [])
    suppression_list = load_json(SUPPRESSION_FILE, [])

    existing_emails = {c["email"].lower() for c in existing_contacts}
    suppressed_emails = {entry["email"].lower() for entry in suppression_list}

    # Parse CSV
    apollo_contacts = parse_apollo_csv(args.csv_file)
    print(f"Parsed {len(apollo_contacts)} contacts from CSV")

    added = 0
    skipped_dupe = 0
    skipped_suppressed = 0
    variant_a = 0
    variant_b = 0

    new_contacts = []
    for contact in apollo_contacts:
        email = contact["email"]

        if email in existing_emails:
            skipped_dupe += 1
            continue

        if email in suppressed_emails:
            skipped_suppressed += 1
            continue

        # A/B assignment — 50/50
        variant = "A" if random.random() < 0.5 else "B"
        sequence = "cold-grinder" if variant == "A" else "cold-skimmer"

        if variant == "A":
            variant_a += 1
        else:
            variant_b += 1

        new_contact = {
            "email": email,
            "first_name": contact["first_name"],
            "company": contact["company"],
            "state": contact["state"],
            "sequence": sequence,
            "step": 0,
            "enrolled_at": now,
            "last_sent_at": None,
            "status": "active",
            "source": "apollo",
            "ab_variant": variant,
            "states_of_interest": [contact["state"]] if contact["state"] else [],
        }

        new_contacts.append(new_contact)
        existing_emails.add(email)
        added += 1

    print(f"\nResults:")
    print(f"  New contacts to add: {added}")
    print(f"  Variant A (cold-grinder): {variant_a}")
    print(f"  Variant B (cold-skimmer): {variant_b}")
    print(f"  Skipped (duplicate): {skipped_dupe}")
    print(f"  Skipped (suppressed): {skipped_suppressed}")

    if args.dry_run:
        print("\n[DRY RUN] No changes saved.")
        if new_contacts:
            print("\nSample (first 3):")
            for c in new_contacts[:3]:
                print(f"  {c['email']} — {c['first_name']} @ {c['company']} — {c['sequence']}")
    else:
        all_contacts = existing_contacts + new_contacts
        save_json(CONTACTS_FILE, all_contacts)
        print(f"\nSaved {len(all_contacts)} total contacts to {CONTACTS_FILE}")


if __name__ == "__main__":
    main()
