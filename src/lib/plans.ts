export type PlanTier = "basic" | "plus" | "pro";

export interface Plan {
  tier: PlanTier;
  name: string;
  priceId: string;
  pricePerState: number;
  description: string;
  features: string[];
}

export const CATCH_UP_PRICE_ID = "price_1TAEFQ1UBk0N5M65aDu5P5q1";
export const CATCH_UP_PRICE = 249;

export const PLANS: Record<PlanTier, Plan> = {
  basic: {
    tier: "basic",
    name: "LabLeads Basic",
    priceId: "price_1TAEF81UBk0N5M65oZke89IN",
    pricePerState: 69,
    description: "NIH grant intelligence for your territory.",
    features: [
      "All newly awarded NIH grants",
      "AI equipment need anticipation",
      "PI name, contact info & institution",
      "Full funding details & grant amounts",
      "Weekly email delivery every Monday",
    ],
  },
  plus: {
    tier: "plus",
    name: "LabLeads Plus",
    priceId: "price_1TAEFE1UBk0N5M65xfXyp86s",
    pricePerState: 79,
    description: "NIH + 7 additional federal agencies.",
    features: [
      "Everything in LabLeads Basic",
      "NSF, DOD, DOE, USDA, VA, CDC & NASA grants",
      "Full funding details & grant amounts",
      "Weekly email delivery every Monday",
    ],
  },
  pro: {
    tier: "pro",
    name: "LabLeads Pro",
    priceId: "price_1TAEFE1UBk0N5M65zJjBY0mR",
    pricePerState: 99,
    description: "Grants + new lab detection. Our best package.",
    features: [
      "Everything in LabLeads Plus",
      "New lab & faculty hire detection",
      "First-time grant recipient alerts",
      "New lab setup signals & announcements",
      "Priority Monday AM delivery",
    ],
  },
};

export const VALID_PRICE_IDS = new Set(
  Object.values(PLANS).map((p) => p.priceId)
);
