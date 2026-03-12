# PRD: Custom Stripe Checkout Flow

## Overview
Build a custom checkout flow for Lab Leads Pro that lets customers select a plan, pick their states, see upsell offers, and pay via Stripe Checkout.

## Tech Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Stripe SDK (`stripe` npm package for server, `@stripe/stripe-js` for client)
- Deployed on Vercel

## Environment Variables (Vercel + .env.local)
```
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
```

## Stripe Products (already created)
| Product | Price ID | Price |
|---------|----------|-------|
| LabLeads Basic | price_1TAEF81UBk0N5M65oZke89IN | $69/state/mo |
| LabLeads Plus | price_1TAEFE1UBk0N5M65xfXyp86s | $79/state/mo |
| LabLeads Pro | price_1TAEFE1UBk0N5M65zJjBY0mR | $99/state/mo |
| Catch-Up Report | price_1TAEFQ1UBk0N5M65aDu5P5q1 | $249/state (one-time) |

## User Flow

### Step 1: Plan Selection (from homepage)
- User clicks "Get Started" button under any pricing tier on the homepage
- Button links to `/checkout?plan=basic`, `/checkout?plan=plus`, or `/checkout?plan=pro`
- The "Get Early Access" CTA at the bottom of the page should remain linked to the Google Sheet signup (do NOT change it)

### Step 2: Checkout Page (`/checkout`)
This is a new page. Clean, branded design matching the existing site style.

**Layout:**
1. **Selected Plan Summary** (left/top) — shows which plan they picked, price, key features
2. **State Selector** (center) — multi-select for US states
   - Searchable dropdown or checkbox grid of all 50 states
   - Show count selected: "3 states selected"
   - Price updates live: "3 × $69/mo = $207/mo"
   - Minimum 1 state required
3. **Upsell Banner** (conditional, appears for Basic and Plus selections):
   - **If Basic selected:** "Upgrade to LabLeads Plus for just $10 more per state — get grants from 7 additional federal agencies (NSF, DOD, DOE, NASA, VA, USDA, CDC)" with a toggle/button to upgrade
   - **If Plus selected:** "Go Pro for $20 more per state — add New Lab Detection and be the first rep to reach new PIs" with a toggle/button to upgrade
   - **If Pro selected:** No upsell shown
   - When user accepts upsell, the plan summary and pricing update immediately
4. **Order Summary** (right/bottom):
   - Plan name
   - States selected (listed)
   - Price per state
   - Number of states
   - Monthly total
   - "Subscribe" button
5. **Optional: Catch-Up Report Add-on**
   - Checkbox: "Add 3-Month Catch-Up Report (+$249/state, one-time)" 
   - Brief description: "Get up to speed instantly with 3 months of historical grant data"
   - Updates the order summary with the one-time charge

### Step 3: Stripe Checkout
- Clicking "Subscribe" calls the API route to create a Stripe Checkout Session
- Session includes:
  - The subscription line item (selected price × quantity of states)
  - The catch-up report as a separate one-time line item if selected
  - `metadata` with: plan tier, list of selected states (comma-separated)
  - `customer_email` collection enabled
  - `success_url` = `/checkout/success`
  - `cancel_url` = `/checkout?plan={plan}`
- User is redirected to Stripe's hosted checkout to enter payment details

### Step 4: Success Page (`/checkout/success`)
- Simple thank you page
- "Welcome to Lab Leads Pro! Check your email for confirmation."
- "Your first report arrives Monday morning."
- Link back to homepage

## API Routes

### `POST /api/checkout` (create Stripe Checkout Session)
Request body:
```json
{
  "priceId": "price_1TAEF81UBk0N5M65oZke89IN",
  "states": ["NC", "SC", "VA"],
  "plan": "basic",
  "addCatchUp": false
}
```

Response:
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

Logic:
1. Validate priceId is one of our known prices
2. Create Stripe Checkout Session with:
   - `mode: "subscription"` 
   - Line item: the selected price with `quantity` = number of states
   - If `addCatchUp` is true, add a second line item with catch-up price, `quantity` = number of states
   - `metadata`: `{ plan, states: states.join(","), stateCount: states.length }`
   - `subscription_data.metadata`: same metadata (so it persists on the subscription object)
   - `allow_promotion_codes: true`
3. Return the checkout session URL

## Design Requirements
- Match the existing site's design language (dark theme, clean, professional)
- Mobile responsive
- The state selector should be pleasant to use on both desktop and mobile
- Upsell banner should feel helpful, not pushy — use the site's existing color accent for the upgrade suggestion
- Loading states during redirect to Stripe

## File Structure
```
src/app/checkout/page.tsx          — Main checkout page
src/app/checkout/success/page.tsx  — Success page
src/app/api/checkout/route.ts      — Stripe Checkout Session API
src/lib/stripe.ts                  — Stripe client initialization
src/lib/plans.ts                   — Plan definitions and price mapping
```

## Important Notes
- Do NOT modify the existing homepage pricing buttons' href values — instead, make sure the new `/checkout` page reads the `plan` query parameter
- Actually, DO update the homepage "Get Started" / "Get Early Access" buttons UNDER EACH PRICING TIER to link to `/checkout?plan=basic`, `/checkout?plan=plus`, `/checkout?plan=pro` respectively
- Do NOT change the bottom "Get Early Access" CTA — leave it as-is (it goes to the Google Sheet)
- All prices are tax-inclusive — display the flat dollar amount, no tax line items shown to customer
- Use `.env.local` for Stripe keys (gitignored)
- Create a `.env.example` with placeholder values for documentation

## Checklist
- [ ] Install `stripe` and `@stripe/stripe-js` packages
- [ ] Create Stripe client utility (`src/lib/stripe.ts`)
- [ ] Create plan definitions (`src/lib/plans.ts`)
- [ ] Build checkout page with state selector
- [ ] Build upsell logic
- [ ] Build catch-up report add-on
- [ ] Create API route for Checkout Session
- [ ] Build success page
- [ ] Update homepage pricing tier buttons to link to /checkout
- [ ] Create .env.local with test keys
- [ ] Create .env.example with placeholder keys
- [ ] Test that `npm run build` passes with no errors
- [ ] Ensure mobile responsive
