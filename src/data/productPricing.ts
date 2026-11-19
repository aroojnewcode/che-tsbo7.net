export type ProductPlanId = 'monthly' | 'lifetime' | 'onetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
}

const standardPlans: ProductPlan[] = [
  { id: 'monthly', label: 'Monthly', priceUsd: 35, priceNote: 'USD / month' },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'USD · one-time' },
];

const ugcPlans: ProductPlan[] = [
  { id: 'onetime', label: 'One-time access', priceUsd: 50, priceNote: 'USD · one-time' },
];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'ugc') return ugcPlans;
  return standardPlans;
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

export function checkoutUrlWithPlan(baseUrl: string, planId: ProductPlanId): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}plan=${planId}`;
}

export function lowestPlanPriceUsd(productSlug: string): number {
  const plans = getProductPlans(productSlug);
  return Math.min(...plans.map((plan) => plan.priceUsd));
}

export function productPlanPriceRange(productSlug: string): { low: number; high: number; count: number } {
  const plans = getProductPlans(productSlug);
  const prices = plans.map((plan) => plan.priceUsd);
  return {
    low: Math.min(...prices),
    high: Math.max(...prices),
    count: plans.length,
  };
}
