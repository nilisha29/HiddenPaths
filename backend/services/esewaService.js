import crypto from "crypto";
import axios from "axios";

// eSewa ePay v2 — sandbox/test integration.
//
// EPAYTEST / "8gBm/:&EnhH.1/q" are eSewa's own publicly-documented test
// merchant credentials (see https://developer.esewa.com.np), meant for
// exactly this kind of integration testing. Swap ESEWA_MERCHANT_CODE and
// ESEWA_SECRET_KEY in .env for real production credentials when you have
// a live eSewa merchant account.
//
// IMPORTANT: read lazily (inside a function), NOT as top-level constants.
// server.js imports routes -> controllers -> this service before it calls
// dotenv.config() (ES module imports are hoisted ahead of any top-level
// code in the importing file), so top-level `process.env.X` reads here
// would always see `undefined` and silently ignore anything you put in
// .env — masked today only because these particular defaults happen to be
// valid real credentials.
const getConfig = () => ({
  merchantCode: process.env.ESEWA_MERCHANT_CODE || "EPAYTEST",
  secretKey: process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q",
  formUrl: process.env.ESEWA_FORM_URL || "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
  statusUrl:
    process.env.ESEWA_STATUS_URL || "https://rc-epay.esewa.com.np/api/epay/transaction/status/",
});

const sign = (message, secretKey) =>
  crypto.createHmac("sha256", secretKey).update(message).digest("base64");

/**
 * Builds the auto-submitting form fields for redirecting the browser to
 * eSewa's hosted payment page. The signature covers total_amount,
 * transaction_uuid and product_code, exactly as eSewa's v2 spec requires.
 */
export const buildEsewaFormFields = ({ amount, transactionUuid, successUrl, failureUrl }) => {
  const { merchantCode, secretKey, formUrl } = getConfig();
  const signedFieldNames = "total_amount,transaction_uuid,product_code";
  const message = `total_amount=${amount},transaction_uuid=${transactionUuid},product_code=${merchantCode}`;
  const signature = sign(message, secretKey);

  return {
    formAction: formUrl,
    fields: {
      amount: String(amount),
      tax_amount: "0",
      total_amount: String(amount),
      transaction_uuid: transactionUuid,
      product_code: merchantCode,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: successUrl,
      failure_url: failureUrl,
      signed_field_names: signedFieldNames,
      signature,
    },
  };
};

/**
 * Decodes the base64 `data` query param eSewa appends to success_url,
 * verifies its signature was really produced with our secret key, and
 * double-checks the transaction status directly against eSewa's status API
 * (defense in depth — never trust the redirect payload alone).
 */
export const verifyEsewaTransaction = async ({ data, expectedAmount, expectedTransactionUuid }) => {
  const { merchantCode, secretKey, statusUrl } = getConfig();
  const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

  const fieldNames = decoded.signed_field_names.split(",");
  const message = fieldNames.map((f) => `${f}=${decoded[f]}`).join(",");
  const expectedSignature = sign(message, secretKey);

  if (expectedSignature !== decoded.signature) {
    throw new Error("eSewa signature verification failed");
  }
  if (decoded.transaction_uuid !== expectedTransactionUuid) {
    throw new Error("Transaction UUID mismatch");
  }
  if (Number(decoded.total_amount) !== Number(expectedAmount)) {
    throw new Error("Amount mismatch");
  }
  if (decoded.status !== "COMPLETE") {
    throw new Error(`Payment not complete (status: ${decoded.status})`);
  }

  // Independently confirm with eSewa's status-check API rather than relying
  // solely on the redirect payload.
  let statusRes;
  try {
    statusRes = await axios.get(statusUrl, {
      params: {
        product_code: merchantCode,
        total_amount: expectedAmount,
        transaction_uuid: expectedTransactionUuid,
      },
    });
  } catch (error) {
    // Deliberately not reusing eSewa's own upstream status code here either
    // (same reasoning as the Khalti service) — a failure talking to eSewa's
    // status API should never be mistaken for the traveler's own session
    // being unauthorized.
    console.error("eSewa status check failed:", error.response?.data || error.message);
    const err = new Error("Could not reach eSewa's status-check API. Please try again.");
    err.status = 502;
    throw err;
  }

  if (statusRes.data.status !== "COMPLETE") {
    throw new Error(`eSewa status check did not confirm payment (status: ${statusRes.data.status})`);
  }

  return { transactionCode: decoded.transaction_code, refId: statusRes.data.ref_id };
};

export default { buildEsewaFormFields, verifyEsewaTransaction };
