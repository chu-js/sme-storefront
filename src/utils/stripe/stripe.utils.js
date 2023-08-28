import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  // Removed: stripe API key
);
