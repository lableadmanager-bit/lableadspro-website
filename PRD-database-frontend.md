# PRD: Database Frontend — Authenticated Grant Search at /database

## Overview
Move the existing `/search` page behind authentication and rebrand it as the core product experience at `/database`. Paying customers log in, search grants filtered to their subscribed states, and access PI contact info. Non-paying visitors see the marketing site and sample reports only.

## Current State (What Already Exists)
- **Search UI** (`/search`): Full-featured grant search with filters (state, agency, date range, fiscal year, amount, equipment tags, status), pagination, sort, expandable grant cards. Currently **open to the public with no auth**.
- **Search API** (`/api/search`): Server-side Supabase query builder with full-text search, filtering, sorting, pagination. Uses anon key — no RLS enforcement.
- **Supabase**: Pro plan, RLS enabled on tables, `grants` table with `search_vector` for FTS. ~83K PIs, 5 years of grant data.
- **Checkout flow**: Stripe integration with 3 tiers (Basic $69, Plus $79, Pro $99 per state/month). State selection + add-on builder. Stripe checkout session created via `/api/checkout`.
- **Supabase client** (`src/lib/supabase.ts`): Single client using anon key. No auth client, no session management.
- **No middleware**, no auth pages, no protected routes.

## What We're Building

### Core Concept
`/database` is the logged-in product experience. It's the same powerful search interface we already built, but gated behind Stripe payment → Supabase Auth. Users only see grants for states they're paying for.

### Route Structure
| Route | Auth Required | Purpose |
|-------|--------------|---------|
| `/` | No | Marketing landing page (unchanged) |
| `/sample` | No | Sample report capture (unchanged) |
| `/checkout` | No | Stripe checkout (unchanged) |
| `/database` | **Yes** | Grant search — the product |
| `/database/login` | No | Login page (email + password or magic link) |
| `/database/signup` | No | Post-payment account creation |
| `/checkout/success` | No | Redirect after Stripe → triggers account setup |

### User Journey
1. Visitor lands on lableadspro.com → sees marketing page
2. Clicks pricing → goes to `/checkout` → selects states + plan → pays via Stripe
3. Stripe webhook fires → creates Supabase auth user + stores subscription metadata (plan tier, subscribed states)
4. User redirected to `/checkout/success` → prompted to set password (or magic link sent)
5. User logs in at `/database/login` → lands on `/database`
6. `/database` shows grant search filtered to their subscribed states only

### Authentication

**Provider:** Supabase Auth (built-in, free with Pro plan)

**Method:** Email + password (primary), magic link (fallback/optional)

**Flow:**
- Stripe webhook creates the user in Supabase Auth with their email
- User sets password on first visit (via `/database/signup` or password reset flow)
- Subsequent visits: login at `/database/login`
- Session stored as HTTP-only cookie via Supabase SSR helpers

**Middleware** (`src/middleware.ts`):
- Protect `/database` route — redirect to `/database/login` if no valid session
- Allow all other routes through

### Authorization (Row Level Security)

**User metadata stored in Supabase:**
```json
{
  "plan_tier": "basic|plus|pro",
  "subscribed_states": ["CA", "NY", "TX"],
  "stripe_customer_id": "cus_xxx",
  "subscription_status": "active|canceled|past_due"
}
```

**RLS policies on `grants` table:**
- Anon users: NO access (drop the current open-anon pattern)
- Authenticated users with `subscription_status = 'active'`: Can read grants WHERE `state` is in their `subscribed_states`
- PI email/contact fields: Only visible to authenticated users (currently exposed in the API response — needs to be column-level or view-based)

**API changes:**
- `/api/search` must use the authenticated Supabase client (passes user's JWT → RLS enforces state filtering automatically)
- Remove client-side state filter as a "security" mechanism — RLS is the real gate
- State filter in the UI becomes cosmetic (filter within your subscribed states) rather than the access control layer

### Search UI Changes for /database

**Minimal changes to the existing search page:**
- Move from `/search` to `/database`
- Add user nav element: logged-in user's email + logout button in header
- State filter pre-populated with user's subscribed states (can still filter within them)
- Agency filter: respect plan tier (Basic = NIH only, Plus/Pro = all 8 agencies)
- Add "Your Plan" badge somewhere subtle (e.g., sidebar top: "LabLeads Pro · CA, NY, TX")
- PI contact info (email, phone) visible in expanded grant cards — this is the paid value

**What stays the same:**
- Search bar, keyword search, full-text search
- All existing filters (date, amount, fiscal year, equipment tags, status)
- Sort options (date, amount, relevance)
- Expandable grant cards
- Pagination
- Mobile responsive layout

### Stripe → Supabase User Creation

**Webhook: `checkout.session.completed`**

When Stripe fires this webhook:
1. Extract customer email, plan tier, selected states from session metadata
2. Create Supabase Auth user with email (generate temp password or use invite flow)
3. Store subscription metadata in user's `raw_user_meta_data` or a separate `subscriptions` table
4. Send welcome email with login link (via Resend, which we already use)

**Webhook: `customer.subscription.updated` / `customer.subscription.deleted`**
- Update `subscription_status` in Supabase
- If canceled/past_due → RLS blocks access automatically (user can still log in but sees "subscription inactive" message)

### New Components Needed
1. **Login page** (`/database/login`) — Email + password form, "forgot password" link, magic link option
2. **Signup/set-password page** (`/database/signup`) — For first-time users after payment
3. **Middleware** (`src/middleware.ts`) — Protect `/database/*` routes
4. **Auth context/provider** — Wrap the app with Supabase auth state
5. **Subscription status component** — Shows plan tier, states, "manage subscription" link
6. **Inactive subscription page** — Shown when user is authed but subscription is canceled/past_due

### What Happens to /search?
- **Remove it** or redirect to `/database`. We don't want a free version of the product floating around.
- Alternative: Keep `/search` as a limited demo (show grant titles + institutions but blur/hide PI contact info and abstracts). Could be a conversion tool. **Decision needed from George.**

## Technical Implementation

### Dependencies to Add
- `@supabase/ssr` — Server-side auth helpers for Next.js (cookies, middleware)

### Environment Variables (new)
- None new — we already have `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- May need `SUPABASE_SERVICE_ROLE_KEY` for the webhook endpoint (to create users server-side)

### Database Changes
- **Option A:** Store subscription data in Supabase Auth `raw_user_meta_data` (simpler, fewer tables)
- **Option B:** Create a `subscriptions` table linked to auth.users (more flexible, better for querying)
- **Recommendation:** Option B — separate `subscriptions` table. We'll want to query subscription data for analytics, and user metadata has size limits.

### Subscriptions Table Schema
```sql
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text not null,
  plan_tier text not null check (plan_tier in ('basic', 'plus', 'pro')),
  subscribed_states text[] not null,
  status text not null default 'active' check (status in ('active', 'trialing', 'past_due', 'canceled', 'unpaid')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: users can read their own subscription
alter table public.subscriptions enable row level security;
create policy "Users can read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);
```

### Grants Table RLS Policy
```sql
-- Drop any existing open-access policies first
-- Then:
create policy "Subscribers can read grants in their states"
  on public.grants for select
  using (
    exists (
      select 1 from public.subscriptions s
      where s.user_id = auth.uid()
        and s.status = 'active'
        and state = any(s.subscribed_states)
    )
  );
```

## Build Phases

### Phase 1: Auth Foundation
- [ ] Install `@supabase/ssr`
- [ ] Create Supabase auth client helpers (browser + server)
- [ ] Add middleware to protect `/database` routes
- [ ] Build login page (`/database/login`)
- [ ] Build signup/set-password page (`/database/signup`)
- [ ] Add auth context provider to layout
- [ ] Test: can log in, session persists, middleware redirects

### Phase 2: Subscription Integration
- [ ] Create `subscriptions` table in Supabase
- [ ] Update Stripe webhook to create Supabase user + subscription record on `checkout.session.completed`
- [ ] Handle `customer.subscription.updated` and `customer.subscription.deleted` webhooks
- [ ] Update checkout success page to guide user to set password / log in
- [ ] Test: full Stripe → Supabase user creation flow

### Phase 3: Gated Search
- [ ] Move search page from `/search` to `/database`
- [ ] Update `/api/search` to use authenticated Supabase client
- [ ] Add RLS policies on `grants` table
- [ ] Add subscription status display in database UI
- [ ] Filter agency access by plan tier (Basic = NIH only)
- [ ] Add inactive subscription handling (logged in but not paying)
- [ ] Remove or redirect old `/search` route
- [ ] Test: RLS correctly limits by state, plan tier limits agencies

### Phase 4: Polish
- [ ] Welcome email on account creation (via Resend)
- [ ] "Manage subscription" link (Stripe customer portal)
- [ ] Password reset flow
- [ ] Loading states, error handling, edge cases
- [ ] Mobile testing
- [ ] SEO: ensure `/database` is noindex (product pages, not marketing)

## Open Questions for George
1. **What to do with `/search`?** Kill it, redirect to `/database`, or keep as a blurred demo for conversion?
2. **Magic links vs passwords?** Magic links are simpler (no passwords to forget) but some sales reps might prefer traditional login. Could offer both.
3. **Free trial?** Should new users get X days free before requiring payment? Or payment-first only?
4. **Manage subscription UI?** Stripe has a built-in customer portal for plan changes, cancellations, payment method updates. Want to use that or build custom?

## Success Criteria
- [ ] Paying customer can go from Stripe checkout → set password → log in → search grants in their states
- [ ] Non-paying visitor cannot access `/database` (redirected to login, then needs active subscription)
- [ ] RLS enforces state-level access — no way to see grants outside subscribed states, even via API
- [ ] Plan tier correctly limits agency access (Basic = NIH, Plus/Pro = all)
- [ ] Subscription cancellation immediately blocks access
- [ ] Page loads < 2 seconds, search results < 1 second
