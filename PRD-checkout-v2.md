# PRD: Checkout Flow v2 — Customizable Package Builder

## Overview
Redesign the checkout page to feel like a customizable package builder instead of a fixed plan selection. Every customer picks states and optionally adds features. The entry point (which pricing button they clicked) determines what's pre-selected.

## What Changes
- Replace the current plan-switching UI with a modular add-on approach
- Base plan is always LabLeads Basic ($69/state/mo)
- Two optional add-ons shown as checkboxes
- Pre-selections based on the `plan` query parameter

## User Flow by Entry Point

### `?plan=basic` (clicked Basic button)
- State selector shown
- Two add-on checkboxes shown, both UNCHECKED:
  - ☐ **Add 7 More Federal Agencies** — NSF, DOD, DOE, NASA, VA, USDA, CDC — +$10/state/mo
  - ☐ **Add New Lab Detection** — New lab & faculty hire alerts, first-time grant recipients, new lab signals — +$20/state/mo
- Price shown: "$69/state/mo" updating live as add-ons are toggled
- Running total: "3 states × $69/mo = $207/mo"

### `?plan=plus` (clicked Plus button)
- State selector shown
- Two add-on checkboxes shown:
  - ✅ **Add 7 More Federal Agencies** — PRE-CHECKED
  - ☐ **Add New Lab Detection** — UNCHECKED
- Only the unchecked add-on shows its price (+$20/state/mo)
- The checked one can still be unchecked if they want to downgrade
- Price shown: "$79/state/mo" updating live
- Running total: "3 states × $79/mo = $237/mo"

### `?plan=pro` (clicked Pro button)
- State selector shown
- NO add-on checkboxes or pricing breakdown shown at all
- Just a clean summary: "LabLeads Pro — $99/state/mo"
- They already chose the full package — don't show the individual costs or give them a reason to uncheck things
- Running total: "3 states × $99/mo = $297/mo"

## Checkout Page Layout

### Top Section
- "Customize Your Plan" heading (or "Select Your States" for Pro)
- Brief plan description based on entry:
  - Basic: "Start with NIH grant intelligence for your territory."
  - Plus: "Grants from 8 federal agencies — your territory, fully covered."  
  - Pro: "The complete package. Grants + New Lab Detection."

### State Selector (same as current)
- Grid of 50 state postal code buttons
- Multi-select, click to toggle
- Selected count and live price calculation
- Minimum 1 state required

### Add-Ons Section (NOT shown for Pro entry)
- Clean card/section with checkboxes
- Each add-on has:
  - Checkbox with feature name
  - Brief 1-line description
  - Price delta (+$10/state/mo or +$20/state/mo)
- When toggled, the running total and per-state price update immediately
- Subtle animation on price change (a quick fade or color pulse)

### Order Summary (sticky sidebar on desktop, bottom on mobile)
- Plan name (dynamically built: "LabLeads Basic", "LabLeads Plus", "LabLeads Pro" based on what's checked)
  - The plan name should update dynamically:
    - Base only = "LabLeads Basic"
    - Base + agencies = "LabLeads Plus"  
    - Base + agencies + new lab = "LabLeads Pro"
    - Base + new lab (without agencies) = "LabLeads Basic + New Lab Detection"
- Selected states listed (abbreviated, e.g. "NC, SC, VA")
- Price per state
- Number of states
- Monthly total (large, prominent)
- Optional: Catch-Up Report add-on checkbox (keep this from v1)
  - "Add 3-Month Catch-Up Report (+$249/state, one-time)"
- "Continue to Payment" button → creates Stripe Checkout session

## Stripe Integration
- Same API route as v1 (`/api/checkout/route.ts`)
- Determine which price ID to use based on what's checked:
  - Nothing extra = Basic price (price_1TAEF81UBk0N5M65oZke89IN)
  - Agencies checked = Plus price (price_1TAEFE1UBk0N5M65xfXyp86s)
  - Agencies + New Lab = Pro price (price_1TAEFE1UBk0N5M65zJjBY0mR)
  - New Lab only (no agencies) = This is an edge case. For simplicity, use Basic price + a separate line item? OR just don't allow New Lab without agencies. Recommendation: require agencies to be checked before New Lab can be checked. Makes product sense — you need the full data before detection works.
- Quantity = number of selected states
- Metadata: plan tier, selected states, add-ons selected
- Catch-up report as separate one-time line item if checked

## Add-On Dependency Rule
- **New Lab Detection requires 7 Agency Add-on.** If someone tries to check New Lab Detection without agencies, auto-check agencies too and show a brief tooltip: "New Lab Detection includes all 8 federal agency grants"
- This simplifies everything to our existing 3-tier pricing: Basic ($69), Plus ($79), Pro ($99)

## Design Requirements
- Match existing site dark theme and styling
- The state grid from v1 is good — keep it
- Add-on checkboxes should feel like toggle cards, not basic HTML checkboxes
  - Rounded card with border, checkbox on left, feature name + description on right, price on far right
  - Selected state: highlighted border (accent color), filled checkbox
  - Hover: subtle highlight
- Price transitions should animate (e.g. number counting up/down, or a brief highlight)
- Mobile responsive: stack layout vertically, order summary at bottom
- Loading state when redirecting to Stripe

## File Changes
- `src/app/checkout/page.tsx` — complete rewrite of the checkout UI
- `src/app/api/checkout/route.ts` — minor updates to handle the new request shape
- `src/lib/plans.ts` — may need add-on definitions
- Keep `success` page as-is

## Important
- Do NOT change the homepage at all — the pricing cards and buttons stay exactly as they are
- Do NOT change the bottom "Get Early Access" CTA
- The `?plan=` query parameter from the homepage buttons drives the pre-selection logic
- `npm run build` must pass with zero errors
- Git commit when done

## Checklist
- [ ] Rewrite checkout page with modular add-on approach
- [ ] Implement pre-selection logic based on ?plan= param
- [ ] Build toggle-card style add-on checkboxes
- [ ] Implement add-on dependency (New Lab requires agencies)
- [ ] Dynamic plan naming in order summary
- [ ] Live price calculation with animations
- [ ] Pro entry point: clean view with no add-on breakdown
- [ ] Update API route for new request shape
- [ ] Catch-up report add-on preserved
- [ ] Mobile responsive
- [ ] npm run build passes with zero errors
- [ ] Git commit all changes
