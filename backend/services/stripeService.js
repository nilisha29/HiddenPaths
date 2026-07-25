import Stripe from "stripe";

// Stripe Checkout — real sandbox integration for the "Card" payment method
// (https://docs.stripe.com/checkout/quickstart). Stripe's test mode uses
// keys prefixed sk_test_... — there's no universal public test key like
// eSewa's, so each developer needs their own free Stripe account:
//   1. https://dashboard.stripe.com/register (free, no business verification
//      needed to use test mode)
//   2. https://dashboard.stripe.com/test/apikeys -> copy the "Secret key"
//      (starts with sk_test_)
//   3. Paste it into backend/.env as STRIPE_SECRET_KEY
//
// IMPORTANT: the Stripe client is created lazily (inside a function), NOT
// as a top-level constant. server.js imports routes -> controllers -> this
// service before it calls dotenv.config() (ES module imports are hoisted
// ahead of any top-level code in the importing file), so instantiating
// `new Stripe(process.env.STRIPE_SECRET_KEY)` at the top of this file would
// always see `undefined` and permanently lock in a broken client — the
// exact bug that hit the Khalti integration.
const getStripeClient = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    const err = new Error(
      "STRIPE_SECRET_KEY is not set. Get your free test key from https://dashboard.stripe.com/test/apikeys and add it to backend/.env."
    );
    err.status = 500;
    throw err;
  }
  return new Stripe(key);
};

// Stripe requires a supported settlement currency; NPR isn't one, so for
// this sandbox integration the Card line item is shown in USD (a rough,
// clearly-labelled conversion) while the booking's authoritative price
// stays in NPR everywhere else in the app — Stripe here is only the
// payment rail, not the source of truth for the amount.
const NPR_TO_USD_RATE = Number(process.env.STRIPE_NPR_TO_USD_RATE) || 133;

export const nprToUsdCents = (nprAmount) => Math.round((nprAmount / NPR_TO_USD_RATE) * 100);

/**
 * Creates a Stripe Checkout Session and returns its hosted `url` — the
 * frontend redirects the browser there for the actual test-mode card entry
 * (use Stripe's universal test card 4242 4242 4242 4242, any future expiry,
 * any 3-digit CVC, any ZIP).
 */
export const createCheckoutSession = async ({
  amountNpr,
  productName,
  bookingId,
  successUrl,
  cancelUrl,
}) => {
  const stripe = getStripeClient();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: productName },
            unit_amount: nprToUsdCents(amountNpr),
          },
          quantity: 1,
        },
      ],
      metadata: { bookingId },
      success_url: `${successUrl}${successUrl.includes("?") ? "&" : "?"}session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });
    return session;
  } catch (error) {
    console.error("Stripe session creation failed:", error.message);
    const err = new Error(
      error.type === "StripeAuthenticationError"
        ? "Stripe rejected our server's API key. Check STRIPE_SECRET_KEY in backend/.env."
        : `Stripe checkout could not be created: ${error.message}`
    );
    err.status = 502;
    throw err;
  }
};

/**
 * Retrieves a Checkout Session to confirm final payment status — never
 * trust the redirect alone. `payment_status` is `"paid"` on success.
 */
export const retrieveCheckoutSession = async (sessionId) => {
  const stripe = getStripeClient();
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error("Stripe session retrieval failed:", error.message);
    const err = new Error(`Could not verify Stripe payment: ${error.message}`);
    err.status = 502;
    throw err;
  }
};

export default { createCheckoutSession, retrieveCheckoutSession, nprToUsdCents };
