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
    priceId: "price_1TCsii1UBk0N5M65WjOYmLpY",
    pricePerState: 99,
    description: "NIH grant intelligence + database access for your territory.",
    features: [
      "Weekly NIH grant reports",
      "AI equipment need anticipation",
      "Full NIH grant database access",
      "PI contact info & institution details",
      "Keyword search across all abstracts",
      "Weekly email delivery every Monday",
    ],
  },
  pro: {
    tier: "pro",
    name: "Lab Leads Pro",
    priceId: "price_1TCsix1UBk0N5M65nBv2GFC2",
    pricePerState: 149,
    description: "The complete package. 8 agencies + new lab detection + full database.",
    features: [
      "Everything in Standard",
      "NSF, DOD, DOE, NASA, VA, USDA & CDC grants",
      "Full database access for all 8 agencies",
      "New lab & faculty hire detection",
      "New PI alerts",
      "Priority Monday AM delivery",
    ],
  },
};

export const VALID_PRICE_IDS = new Set(
  Object.values(PLANS).map((p) => p.priceId)
);

export const AUTO_UPGRADE_THRESHOLD = 3; // 3+ states = auto Pro at Standard price

export const PRO_TWO_STATE_BUNDLE = 249; // Pro: 2 states for $249 (vs $298)
export const PRO_TWO_STATE_BUNDLE_PRICE_ID = "price_1TCtDG1UBk0N5M650ZukDQel"; // $249 flat monthly

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
