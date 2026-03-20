# PRD: Website Redesign — Enterprise Database Product

## Overview
Redesign lableadspro.com to reflect the evolved product: weekly curated email reports + live grant database access. The current site was built around email-only delivery. The database changes everything — positioning, pricing, copy, social proof, and the overall feel.

## Core Positioning Shift

### Before
"Weekly grant reports delivered to your inbox"

### After
"Enterprise-level grant intelligence, priced for the individual rep."

The database is the product. The emails are the delivery mechanism. Together, they give a single sales rep the same intel that enterprise teams pay $20K+/year for from SciLeads or Definitive Healthcare.

## Stats to Feature (current, growing weekly)
| Metric | Current | After Plus Sync |
|--------|---------|-----------------|
| Total grants | 342,000+ | 350,000+ |
| PIs with contact info | 151,000+ | 155,000+ |
| Verified PI emails | 108,000+ | 110,000+ |
| Federal agencies | 2 (NIH, NSF) | 8 (NIH, NSF, DOD, DOE, NASA, VA, USDA, CDC) |
| States covered | All 50 | All 50 |
| Years of data | 5 (FY2021-2025) | 5+ |

## New Hero Section

### Headline
"Enterprise-Level Intelligence. Individual Rep Pricing."

### Subheadline  
"350,000+ federal research grants. 151,000+ PI contacts. 8 agencies. Your territory. Updated weekly."

### CTA
"See Your State's Data →" (links to /sample or /checkout)

### Optional: Live counter or stat bar
Animated counters showing grants, PIs, agencies in real-time. Creates a sense of scale.

## New Site Structure

### Header Nav
| Item | Link |
|------|------|
| How It Works | /#how-it-works |
| Database | /database (login required) |
| Pricing | /#pricing |
| Sample Report | /sample |
| Sign In | /database/login |
| **Get Started** (CTA button) | /#pricing |

### Sections (top to bottom)

#### 1. Hero
- New headline + subheadline
- Stat bar: grants, PIs, agencies
- Primary CTA

#### 2. The Problem (update copy)
Current copy focuses on "missing grants." Update to include:
- "Enterprise tools cost $20K+/year and lock you into annual contracts"
- "Free sources like NIH Reporter require manual searching with no filtering, no alerts, no contact info ready to go"
- "You're either overpaying or under-informed"

#### 3. Two Products, One Subscription
**NEW SECTION** — replaces or augments current "How It Works"

Split into two columns:

**Column 1: Weekly Intelligence Reports**
- Curated grant leads delivered every Monday
- AI-powered equipment need anticipation
- PI contact info included
- Excel + HTML format
- "Intel pushed to you — no login required"

**Column 2: Live Grant Database**
- 350,000+ searchable grants
- Filter by state, agency, institution, grant type, date, keyword
- PI contact cards with email
- Click a PI → see their full funding portfolio
- "Your personal grant search engine — log in anytime"

#### 4. Features (update)
Keep the feature grid but update to include database features:
- Keyword search across all abstracts
- Institution filter ("planning a visit to Duke? See what's funded")
- Grant type filter (R01, U01, K08...)
- PI click-through profiles
- "Email available through source" for NIH grants
- State-restricted access (you only see your territory)

#### 5. Database Preview / Screenshot
**NEW SECTION** — show a screenshot or animated GIF of the database in action
- Blurred/redacted version showing the search UI, filters, grant cards
- Caption: "This is what $99/month looks like."
- CTA: "Get Access →"

#### 6. Pricing (update)
**Updated pricing cards reflecting database access:**

| | Basic ($69/state/mo) | Plus ($79/state/mo) | Pro ($99/state/mo) |
|---|---|---|---|
| Weekly NIH reports | ✅ | ✅ | ✅ |
| Live grant database | ✅ | ✅ | ✅ |
| AI equipment anticipation | ✅ | ✅ | ✅ |
| PI contact info | ✅ | ✅ | ✅ |
| 7 additional agencies | | ✅ | ✅ |
| New lab detection | | | ✅ |
| Priority delivery | | | ✅ |

**Key decision for George:** Do all plans get database access? (Recommended: yes — it's the stickiness play. Reduces churn because reps log in daily.)

#### 7. Social Proof / Trust
- "Monitoring $X billion in active federal research funding"
- Agency logos: NIH, NSF, DOD, DOE, NASA, VA, USDA, CDC
- Number of grants, PIs, states
- Future: testimonials, case studies

#### 8. FAQ (update)
Add database-related questions:
- "What is the grant database?"
- "How often is the database updated?"
- "Can I search by institution or PI name?"
- "What if I need more states?"
- "Is my data secure?" (RLS, state-level access, etc.)

#### 9. CTA (final)
"Start getting smarter leads today. Pick your states and get instant database access + weekly reports."

## Design Direction

### Feel
- **Enterprise but accessible** — clean, data-forward, not intimidating
- Dark header/hero (current dark theme works), white content sections
- More whitespace, larger type for headlines
- Data visualization elements (stat counters, maybe a simple chart)

### Colors
- Keep current brand green (#16A34A) for CTAs and accents
- Dark navy (#0F172A) for headers
- Clean whites and light grays for content

### Typography
- Larger, bolder headlines
- More contrast between sections
- Feature descriptions can be slightly more detailed now that we have more to show

## Database Demo Account (for Loom video)
Create a demo account with:
- Email: demo@lableadspro.com
- All 50 states access
- Pro plan
- Purpose: George's Loom walkthrough, sales demos, marketing screenshots

## Technical Changes Needed
1. Update Hero component with new headline/stats
2. Add "Two Products" section component
3. Add database screenshot/preview section
4. Update Pricing component with database access row
5. Update FAQ component with database questions
6. Update Header nav (add Sign In link)
7. Create demo subscription in Supabase
8. Take screenshots of database for marketing
9. Update meta tags / OG image for social sharing
10. Update sitemap (exclude /database/* from indexing)

## Content Needed from George
- [ ] Approve final tagline / headline
- [ ] Confirm pricing structure (all plans get database?)
- [ ] Record Loom video for marketing
- [ ] Approve screenshot selection for site
- [ ] Review final copy before deploy

## Launch Sequence
1. George approves PRD + pricing decision
2. Build new sections + update copy
3. George reviews on preview deploy
4. Record Loom video
5. Push to production
6. Update cold email templates to reference database
7. Announce to existing sample leads

## SEO Content Pages — `/guide`

### Purpose
Dual-purpose: help customers understand the data AND rank on Google for high-intent searches from our exact target audience (life science sales reps researching grants).

### Page Structure
Each guide page is a standalone, indexable page optimized for a specific long-tail keyword cluster.

### Page 1: `/guide/nih-institutes` — "NIH Institutes & Centers: What Each One Funds"
- **Target keywords:** "NIH institutes list," "what does NCI fund," "NIH funding agencies explained"
- H1: "NIH Institutes & Centers: A Sales Rep's Guide to Who Funds What"
- Individual section for each of the 27 NIH institutes/centers
- For each: full name, abbreviation, what they fund, typical grant sizes, equipment implications for sales reps
- Example: "NCI (National Cancer Institute) — funds cancer research across all stages. Common equipment needs: flow cytometers, imaging systems, sequencers, cell sorters."
- Internal link: "See live NCI-funded grants in your state →" (links to /database with NCI filter — login required)
- Schema markup: FAQ schema for each institute

### Page 2: `/guide/grant-types` — "NIH Grant Types Explained: R01, R21, U01, K08 & More"
- **Target keywords:** "what is an R01 grant," "NIH grant types explained," "R01 vs R21"
- H1: "NIH Grant Types: What Every Lab Equipment Rep Needs to Know"
- Section for each major activity code (R01, R21, R03, R15, R35, U01, U19, P01, P30, K08, K23, K99, F31, F32, T32, etc.)
- For each: what it funds, typical duration, typical budget, whether the PI is likely buying equipment
- Sales rep signal rating: 🔥🔥🔥 (R01 = hot, big budget) vs ❄️ (T32 = training, probably not buying)
- Internal link: "Search R01 grants in your state →"
- Schema markup: FAQ schema, HowTo schema where appropriate

### Page 3: `/guide/federal-agencies` — "8 Federal Agencies That Fund Lab Research"
- **Target keywords:** "federal research funding agencies," "NSF vs NIH grants," "DOD research funding"
- Covers: NIH, NSF, DOD, DOE, NASA, VA, USDA, CDC
- For each: what they fund, how their grants differ, typical PI profiles, equipment implications
- Comparison table: budget ranges, review timelines, focus areas
- Internal links to filtered database views

### Page 4: `/guide/how-to-sell-to-funded-labs` — "How to Use Grant Data to Sell Lab Equipment"
- **Target keywords:** "selling to research labs," "lab equipment sales strategy," "how to use NIH Reporter"
- The money page — speaks directly to our customer
- Sections: "Why grants matter for equipment sales," "How to read a grant abstract for equipment signals," "When to reach out after a grant is awarded," "Using Lab Leads Pro to find your next customer"
- This is the page we want ranking for our exact buyer persona
- Strong CTA to /sample and /pricing

### SEO Technical Requirements
- Each page gets unique meta title, description, OG tags
- Structured data (FAQ schema, BreadcrumbList)
- Internal linking between guide pages and to /database, /sample, /pricing
- Canonical URLs
- Add to sitemap.xml
- ~2,000-3,000 words per page (long-form for ranking)
- Mobile responsive (most reps browse on phone)
- Fast loading (no heavy images — text-forward)

### Content Creation Plan
- George provides domain expertise and sales rep perspective
- Felix drafts the content with SEO structure
- George reviews for accuracy and tone
- Publish as part of website redesign launch

## /database Page Redesign — Dual Purpose

### Logged Out Experience
When a visitor hits `/database` without being authenticated, instead of redirecting to login, show a marketing/content landing page:

**Layout:**
- **Top right corner:** "Sign In" button (subtle, not blocking)
- **Hero section:** "350,000+ Grants. 151,000+ PIs. Search Your Territory."
- **Database preview:** Screenshot or blurred preview of the actual search UI
- **Guide content links:** Cards linking to the guide pages:
  - "NIH Institutes & Centers Explained →"
  - "Grant Types: What R01, R21, U01 Mean for You →"  
  - "8 Federal Agencies That Fund Lab Research →"
  - "How to Use Grant Data to Sell Lab Equipment →"
- **CTA:** "Get Access — Plans start at $69/state/month" → links to /#pricing
- **SEO benefit:** `/database` becomes an indexable landing page that ranks for "grant database" keywords

### Logged In Experience
Same as current — the full search UI with filters, results, PI contacts.

### Technical Change
Update middleware.ts: instead of redirecting unauthenticated users to `/database/login`, render a public landing page component. The middleware stays but the behavior changes — no session = show marketing page, valid session = show app.

### Why This Matters
- Eliminates the login wall that bounces organic traffic
- Guide content lives under the `/database` tab in nav — logical home
- Visitors get value before signing up (guides) → builds trust → converts
- `/database` page itself becomes SEO-optimized content

## What This Is NOT
- Not changing the checkout flow (already works)
- Not changing the database UI (already built)
- Not changing email delivery (already automated)
- Not adding new features — just better marketing of what exists
