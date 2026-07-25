import asyncHandler from "express-async-handler";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";
import createNotification from "../services/notificationService.js";
import { buildEsewaFormFields, verifyEsewaTransaction } from "../services/esewaService.js";
import { initiateKhaltiPayment, lookupKhaltiPayment } from "../services/khaltiService.js";
import { createCheckoutSession, retrieveCheckoutSession } from "../services/stripeService.js";

const FRONTEND_URL = process.env.CLIENT_URL || "http://localhost:5173";

const getOwnedUnpaidBooking = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    const err = new Error("Booking not found");
    err.status = 404;
    throw err;
  }
  if (booking.userId.toString() !== userId.toString()) {
    const err = new Error("Not authorized to pay for this booking");
    err.status = 403;
    throw err;
  }
  if (booking.paymentStatus === "paid") {
    const err = new Error("This booking has already been paid for");
    err.status = 400;
    throw err;
  }
  return booking;
};

const finalizeBookingPayment = async (booking, { method, transactionId }) => {
  const payment = await Payment.create({
    bookingId: booking._id,
    userId: booking.userId,
    amount: booking.totalPrice,
    method,
    status: "success",
    transactionId,
  });

  booking.paymentStatus = "paid";
  booking.status = "confirmed";
  await booking.save();

  await Experience.findByIdAndUpdate(booking.experienceId, {
    $inc: { availableSeats: -booking.numberOfPeople },
  });

  await createNotification({
    userId: booking.guideId,
    type: "booking_confirmed",
    message: "A booking has been paid and confirmed.",
    link: "/guide/bookings",
  });

  return payment;
};

// ---------------------------------------------------------------------
// Card (real Stripe Checkout sandbox — test mode) — hosted-checkout
// redirect flow, same shape as the eSewa/Khalti flows below.
// ---------------------------------------------------------------------

// @desc    Create a Stripe Checkout Session — returns the hosted `url` to
//          redirect to for real test-mode card entry.
// @route   POST /api/payments/card/initiate
// @access  Private (user)
export const initiateCardPayment = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const booking = await getOwnedUnpaidBooking(bookingId, req.user._id).then((b) =>
    b.populate("experienceId", "title")
  );

  const session = await createCheckoutSession({
    amountNpr: booking.totalPrice,
    productName: booking.experienceId?.title || "HiddenPaths booking",
    bookingId: booking._id.toString(),
    successUrl: `${FRONTEND_URL}/payment/card/callback?bookingId=${booking._id}`,
    cancelUrl: `${FRONTEND_URL}/payment/card/callback?status=cancelled&bookingId=${booking._id}`,
  });

  res.json({ success: true, data: { url: session.url } });
});

// @desc    Verify a Stripe Checkout Session and finalize the booking.
//          Called by the frontend's /payment/card/callback page.
// @route   POST /api/payments/card/verify
// @access  Private (user)
export const verifyCardPayment = asyncHandler(async (req, res) => {
  const { sessionId, bookingId } = req.body;
  if (!sessionId || !bookingId) {
    res.status(400);
    throw new Error("Missing sessionId or bookingId");
  }

  const booking = await getOwnedUnpaidBooking(bookingId, req.user._id).catch((err) => {
    // If already paid, just return it instead of erroring on refresh
    if (err.message === "This booking has already been paid for") return null;
    throw err;
  });

  if (!booking) {
    const paidBooking = await Booking.findById(bookingId);
    return res.json({ success: true, data: { booking: paidBooking } });
  }

  const session = await retrieveCheckoutSession(sessionId);
  if (session.payment_status !== "paid") {
    res.status(400);
    throw new Error(`Card payment not completed (status: ${session.payment_status})`);
  }
  if (session.metadata?.bookingId !== bookingId) {
    res.status(403);
    throw new Error("Session does not match this booking");
  }

  await finalizeBookingPayment(booking, {
    method: "card",
    transactionId: session.payment_intent || session.id,
  });

  res.json({ success: true, data: { booking } });
});

// @desc    Get a payment record (owner only)
// @route   GET /api/payments/:id
// @access  Private
export const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate("bookingId");
  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }
  if (payment.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to view this payment");
  }
  res.json({ success: true, data: payment });
});

// ---------------------------------------------------------------------
// eSewa (sandbox v2) — form-redirect flow
// ---------------------------------------------------------------------

// @desc    Build the signed form fields to redirect the browser to eSewa's
//          hosted sandbox checkout page.
// @route   POST /api/payments/esewa/initiate
// @access  Private (user)
export const initiateEsewaPayment = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const booking = await getOwnedUnpaidBooking(bookingId, req.user._id);

  const transactionUuid = `${booking._id}-${Date.now()}`;
  booking.transactionUuid = transactionUuid;
  await booking.save();

  const { formAction, fields } = buildEsewaFormFields({
    amount: booking.totalPrice,
    transactionUuid,
    successUrl: `${FRONTEND_URL}/payment/esewa/callback`,
    failureUrl: `${FRONTEND_URL}/payment/esewa/callback?status=failed`,
  });

  res.json({ success: true, data: { formAction, fields } });
});

// @desc    Verify the eSewa redirect payload and finalize the booking.
//          Called by the frontend's /payment/esewa/callback page.
// @route   POST /api/payments/esewa/verify
// @access  Private (user)
export const verifyEsewaPayment = asyncHandler(async (req, res) => {
  const { data } = req.body;
  if (!data) {
    res.status(400);
    throw new Error("Missing eSewa response data");
  }

  const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
  const booking = await Booking.findOne({ transactionUuid: decoded.transaction_uuid });
  if (!booking) {
    res.status(404);
    throw new Error("No matching booking for this transaction");
  }
  if (booking.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized for this transaction");
  }
  if (booking.paymentStatus === "paid") {
    return res.json({ success: true, data: { booking } });
  }

  const { refId } = await verifyEsewaTransaction({
    data,
    expectedAmount: booking.totalPrice,
    expectedTransactionUuid: booking.transactionUuid,
  });

  await finalizeBookingPayment(booking, { method: "esewa", transactionId: refId });

  res.json({ success: true, data: { booking } });
});

// ---------------------------------------------------------------------
// Khalti (sandbox ePayment API v2) — hosted-checkout redirect flow
// ---------------------------------------------------------------------

// @desc    Initiate a Khalti ePayment — returns the payment_url to redirect to.
// @route   POST /api/payments/khalti/initiate
// @access  Private (user)
export const initiateKhaltiPaymentHandler = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const booking = await getOwnedUnpaidBooking(bookingId, req.user._id).then((b) =>
    b.populate("experienceId", "title")
  );

  const khaltiRes = await initiateKhaltiPayment({
    amountInPaisa: Math.round(booking.totalPrice * 100),
    purchaseOrderId: booking._id.toString(),
    purchaseOrderName: booking.experienceId?.title || "HiddenPaths booking",
    customerInfo: {
      name: booking.fullName || req.user.name,
      email: booking.email || req.user.email,
      phone: booking.contactPhone || "9800000000",
    },
    returnUrl: `${FRONTEND_URL}/payment/khalti/callback`,
    websiteUrl: FRONTEND_URL,
  });

  res.json({ success: true, data: khaltiRes });
});

// @desc    Verify a Khalti payment via lookup and finalize the booking.
//          Called by the frontend's /payment/khalti/callback page.
// @route   POST /api/payments/khalti/verify
// @access  Private (user)
export const verifyKhaltiPaymentHandler = asyncHandler(async (req, res) => {
  const { pidx, bookingId } = req.body;
  if (!pidx || !bookingId) {
    res.status(400);
    throw new Error("Missing pidx or bookingId");
  }

  const booking = await getOwnedUnpaidBooking(bookingId, req.user._id).catch((err) => {
    // If already paid, just return it instead of erroring on refresh
    if (err.message === "This booking has already been paid for") return null;
    throw err;
  });

  if (!booking) {
    const paidBooking = await Booking.findById(bookingId);
    return res.json({ success: true, data: { booking: paidBooking } });
  }

  const lookup = await lookupKhaltiPayment(pidx);
  if (lookup.status !== "Completed") {
    res.status(400);
    throw new Error(`Khalti payment not completed (status: ${lookup.status})`);
  }

  await finalizeBookingPayment(booking, { method: "khalti", transactionId: lookup.transaction_id });

  res.json({ success: true, data: { booking } });
});
