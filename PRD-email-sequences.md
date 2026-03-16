# PRD: Email Marketing Infrastructure

## Overview
Build the email drip system for Lab Leads Pro's marketing sequences. Three sequences: two cold outreach variants (A/B test) and one warm funnel for sample report downloaders.

## Tech Stack
- **Framework:** Next.js (already deployed on Vercel)
- **Email sending:** Resend API (already configured, key in `process.env.RESEND_API_KEY`)
- **From address:** `Lab Leads Pro <freshleads@lableadspro.com>`
- **Data storage:** JSON files in `data/email-marketing/` (consistent with existing `data/sample-leads/leads.jsonl` pattern)
- **Physical address for CAN-SPAM footer:** 2520 South Blvd, Charlotte, NC 28203

## What to Build

### 1. Unsubscribe System (Website API)

**New API route:** `src/app/api/unsubscribe/route.ts`
- `GET /api/unsubscribe?email={email}&token={token}` — shows a simple "You've been unsubscribed" page
- `POST /api/unsubscribe` — programmatic unsubscribe
- Token is HMAC-SHA256 of the email using a secret (env var `UNSUBSCRIBE_SECRET`), prevents abuse
- Stores unsubscribed emails in `data/email-marketing/suppression-list.json`

**New page:** `src/app/unsubscribe/page.tsx`
- Simple confirmation page: "You've been unsubscribed from Lab Leads Pro emails."
- Clean, branded, not ugly

### 2. Email Drip Engine (Standalone Script)

**New script:** `scripts/email-drip.py`

This is a standalone Python script (NOT a Next.js API route) that runs on the Mac mini via cron. It:

1. **Loads contacts** from `data/email-marketing/contacts.json`
2. **Checks suppression list** — skips anyone who unsubscribed
3. **Determines what to send** — based on each contact's sequence, current step, and last send date
4. **Sends via Resend API** — using the HTML templates
5. **Logs sends** to `data/email-marketing/send-log.jsonl`
6. **Respects sending limits** — configurable max sends per run (default 50)

#### Contact Schema (`data/email-marketing/contacts.json`)
```json
[
  {
    "email": "rep@company.com",
    "first_name": "Jane",
    "company": "Zeiss",
    "state": "CA",
    "sequence": "cold-grinder",  // or "cold-skimmer" or "warm-sample"
    "step": 0,
    "enrolled_at": "2026-03-16T00:00:00Z",
    "last_sent_at": null,
    "status": "active",  // active, completed, unsubscribed
    "source": "apollo",  // or "sample-funnel"
    "ab_variant": "A",  // for cold sequences: A=grinder, B=skimmer
    "states_of_interest": ["CA", "OR", "WA"]  // for warm sequence, from sample download
  }
]
```

#### Sequence Definitions
Built into the script as config:

- **cold-grinder:** 5 emails, days [0, 3, 6, 10, 14]
- **cold-skimmer:** 5 emails, days [0, 3, 6, 10, 14]  
- **warm-sample:** 6 emails, days [0, 2, 5, 9, 14, 21]

#### A/B Assignment
When importing Apollo contacts, randomly assign 50/50 to variant A (grinder) or B (skimmer). The assignment is stored in the contact record and never changes.

### 3. HTML Email Templates

**Directory:** `scripts/email-templates/`

Create HTML email templates for all 16 emails (5 + 5 + 6). Each template:
- Clean, professional HTML email (single column, max 600px width)
- Minimal styling — works in all email clients (tables for layout, inline CSS)
- Lab Leads Pro branding (keep it simple — no heavy graphics)
- CAN-SPAM footer in every email:
  ```
  Lab Leads Pro | 2520 South Blvd, Charlotte, NC 28203
  [Unsubscribe](https://lableadspro.com/api/unsubscribe?email={{email}}&token={{token}})
  ```
- Template variables: `{{first_name}}`, `{{state}}`, `{{email}}`, `{{unsubscribe_url}}`

Use the email copy from `data/marketing/email-sequences-v1.md` as the source content.

For email 3 of the warm sequence ("here's what you missed this week"), use placeholder data — we'll wire in live pipeline data later.

### 4. Import Script

**New script:** `scripts/import-apollo-contacts.py`

Takes an Apollo CSV export and:
1. Deduplicates against existing contacts
2. Randomly assigns A/B variant
3. Sets sequence based on variant (A → cold-grinder, B → cold-skimmer)
4. Checks against suppression list
5. Outputs to `data/email-marketing/contacts.json`

### 5. Sample Funnel Integration

**Modify:** `src/app/api/send-sample/route.ts`

After logging the lead to `data/sample-leads/leads.jsonl` (existing behavior), ALSO add the contact to `data/email-marketing/contacts.json` with:
- `sequence: "warm-sample"`
- `source: "sample-funnel"` 
- `states_of_interest` from their submission
- `step: 0` (Email 1 is the sample delivery itself, which is already sent by the existing code)
- Actually set `step: 1` since Email 1 (sample delivery) is handled by the existing send-sample route

### 6. Data Directories

Create these directories:
- `data/email-marketing/` — contacts, suppression list, send logs
- `scripts/email-templates/` — HTML email templates

## What NOT to Build
- No web dashboard for managing contacts (overkill for now)
- No open/click tracking (we can add this later)
- No automated enrollment from Apollo — that's a manual import step
- No pricing page (separate task)
- Don't modify the main website pages (page.tsx, sample/page.tsx, etc.)

## Testing
- Add a `--dry-run` flag to email-drip.py that prints what would be sent without actually sending
- Add a `--test-email george@lableadspro.com` flag that sends all emails to a test address instead

## File Checklist
- [ ] `src/app/api/unsubscribe/route.ts` — API endpoint
- [ ] `src/app/unsubscribe/page.tsx` — confirmation page
- [ ] `scripts/email-drip.py` — main drip engine
- [ ] `scripts/import-apollo-contacts.py` — Apollo CSV importer
- [ ] `scripts/email-templates/cold-grinder-{1-5}.html` — 5 templates
- [ ] `scripts/email-templates/cold-skimmer-{1-5}.html` — 5 templates
- [ ] `scripts/email-templates/warm-sample-{1-6}.html` — 6 templates
- [ ] `data/email-marketing/contacts.json` — empty initial file
- [ ] `data/email-marketing/suppression-list.json` — empty initial file
- [ ] Modified `src/app/api/send-sample/route.ts` — add warm funnel enrollment
