export type PlanTier = "standard" | "pro";

export interface Plan {
  tier: PlanTier;
  name: string;
  priceId: string;
  pricePerState: number;
  description: string;
  features: string[];
}

// Old price IDs for reference:
// basic:  price_1TAEF81UBk0N5M65oZke89IN ($69)
// plus:   price_1TAEFE1UBk0N5M65xfXyp86s ($79)
// pro:    price_1TAEFE1UBk0N5M65zJjBY0mR ($99)
// catchUp: price_1TAEFQ1UBk0N5M65aDu5P5q1 ($249)

export const PLANS: Record<PlanTier, Plan> = {
  standard: {
    tier: "standard",
    name: "Lab Leads Standard",
    priceId: "price_1THQUB0TyUCXdeWQEx4hWupL",
    pricePerState: 99,
    description: "NIH grant intelligence + database access for your territory. The foundation every rep needs.",
    features: [
      "Weekly NIH grant reports every Monday",
      "AI equipment classification (90+ tags)",
      "Full NIH grant database access",
      "PI contact info & institution details",
      "Keyword search across all abstracts",
      "New investigator badges (R00, K99, DP2)",
    ],
  },
  pro: {
    tier: "pro",
    name: "Lab Leads Pro",
    priceId: "price_1THQU90TyUCXdeWQChBoHS78",
    pricePerState: 149,
    description: "The complete package. 8 agencies + new lab detection + enriched favorites. Everything you need to hit President's Club.",
    features: [
      "Everything in Standard",
      "NSF, DOD, DOE, NASA, VA, USDA & CDC grants",
      "Full database access across all 8 agencies",
      "New lab & faculty hire detection",
      "Favorites with weekly enrichment & CSV export",
      "Priority Monday AM delivery",
    ],
  },
};

export const VALID_PRICE_IDS = new Set(
  Object.values(PLANS).map((p) => p.priceId)
);

export const AUTO_UPGRADE_THRESHOLD = 3; // 3+ states = auto Pro at Standard price

export const PRO_TWO_STATE_BUNDLE = 248; // Pro: 2 states for $248 (vs $298, exactly $50 off)
export const PRO_TWO_STATE_BUNDLE_PRICE_ID = "price_1THQU70TyUCXdeWQ7FwMYxlP"; // $248 flat monthly

export function getEffectivePlan(
  selectedTier: PlanTier,
  stateCount: number
): { tier: PlanTier; pricePerState: number; autoUpgraded: boolean; monthlyTotal: number; proBundle: boolean; proFreeState?: boolean; freeStates?: number; billedStates?: number } {
  if (selectedTier === "standard" && stateCount >= AUTO_UPGRADE_THRESHOLD) {
    return { tier: "pro", pricePerState: PLANS.standard.pricePerState, autoUpgraded: true, monthlyTotal: stateCount * PLANS.standard.pricePerState, proBundle: false };
  }
  if (selectedTier === "pro" && stateCount === 2) {
    // 2-state Pro bundle: $249 flat
    return { tier: "pro", pricePerState: PLANS.pro.pricePerState, autoUpgraded: false, monthlyTotal: PRO_TWO_STATE_BUNDLE, proBundle: true, proFreeState: false };
  }
  if (selectedTier === "pro" && stateCount >= 3) {
    // 3+ states on Pro: every 3rd state free (pay for 2 of every 3)
    const freeStates = Math.floor(stateCount / 3);
    const billedStates = stateCount - freeStates;
    return { tier: "pro", pricePerState: PLANS.pro.pricePerState, autoUpgraded: false, monthlyTotal: billedStates * PLANS.pro.pricePerState, proBundle: false, proFreeState: true, freeStates, billedStates };
  }
  return { tier: selectedTier, pricePerState: PLANS[selectedTier].pricePerState, autoUpgraded: false, monthlyTotal: stateCount * PLANS[selectedTier].pricePerState, proBundle: false };
}
