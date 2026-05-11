// Single source of truth for the donation checkout currency.
// MUST match the currency used in supabase/functions/create-donation-checkout/index.ts
// Update both together if the checkout currency ever changes.
export const DONATION_CURRENCY = "USD";
