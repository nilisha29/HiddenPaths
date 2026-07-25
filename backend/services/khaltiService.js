import axios from "axios";

// Khalti ePayment API v2 (https://docs.khalti.com).
//
// Per Khalti's own docs: sandbox and production are different DOMAINS
// (dev.khalti.com vs khalti.com), NOT differentiated by key prefix like
// most providers. Confusingly, the key shown as "Live secret key" on the
// SANDBOX portal (test-admin.khalti.com) is itself the correct sandbox
// key to use here — that portal's "live" key only becomes a real
// production key if it's the one from admin.khalti.com instead.
//
// IMPORTANT: these are read lazily (inside a function), NOT as top-level
// constants. server.js imports routes -> controllers -> this service before
// it calls dotenv.config() (ES module imports are hoisted ahead of any
// top-level code in the importing file), so a top-level
// `process.env.KHALTI_SECRET_KEY` here would always see `undefined` and
// silently lock in an empty value, no matter how correct your .env is.
const getConfig = () => ({
  secretKey: process.env.KHALTI_SECRET_KEY || "",
  baseUrl: process.env.KHALTI_BASE_URL || "https://dev.khalti.com/api/v2",
});

// Wraps a Khalti API call so an upstream failure (e.g. Khalti rejecting our
// server's own API key) never leaks straight through as a raw HTTP status.
// Without this, an upstream 401 from Khalti (bad/expired KHALTI_SECRET_KEY)
// looked indistinguishable from the traveler's own session being
// unauthorized — very confusing, since it has nothing to do with their login.
const callKhalti = async (path, body, action) => {
  const { secretKey, baseUrl } = getConfig();

  if (!secretKey) {
    const err = new Error(
      "KHALTI_SECRET_KEY is not set. Get your sandbox key from https://test-admin.khalti.com (Settings → Keys → Secret Key) and add it to backend/.env."
    );
    err.status = 500;
    throw err;
  }

  try {
    const res = await axios.post(`${baseUrl}${path}`, body, {
      headers: {
        Authorization: `Key ${secretKey}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    const upstreamStatus = error.response?.status;
    const upstreamDetail =
      error.response?.data?.detail ||
      error.response?.data?.error_key ||
      JSON.stringify(error.response?.data) ||
      error.message;

    console.error(`Khalti ${action} failed (upstream status ${upstreamStatus}):`, upstreamDetail);

    const err = new Error(
      upstreamStatus === 401 || upstreamStatus === 403
        ? "Khalti sandbox rejected our server's API key. Check KHALTI_SECRET_KEY in backend/.env."
        : `Khalti ${action} failed: ${upstreamDetail}`
    );
    // 502 (Bad Gateway) — this is a failure talking to an upstream service,
    // deliberately NOT reusing Khalti's own status code so it's never
    // confused with the traveler's own auth state.
    err.status = 502;
    throw err;
  }
};

/**
 * Kicks off a Khalti ePayment — returns a `payment_url` the frontend
 * redirects the browser to for the actual hosted checkout (test wallets
 * with any of Khalti's documented test phone/OTP combos work here).
 */
export const initiateKhaltiPayment = ({
  amountInPaisa,
  purchaseOrderId,
  purchaseOrderName,
  customerInfo,
  returnUrl,
  websiteUrl,
}) =>
  callKhalti(
    "/epayment/initiate/",
    {
      return_url: returnUrl,
      website_url: websiteUrl,
      amount: amountInPaisa,
      purchase_order_id: purchaseOrderId,
      purchase_order_name: purchaseOrderName,
      customer_info: customerInfo,
    },
    "initiate"
  );

/**
 * Confirms a payment's final status directly with Khalti (never trust the
 * redirect query params alone) — returns Khalti's lookup payload, whose
 * `status` will be "Completed" on success.
 */
export const lookupKhaltiPayment = (pidx) => callKhalti("/epayment/lookup/", { pidx }, "lookup");

export default { initiateKhaltiPayment, lookupKhaltiPayment };
