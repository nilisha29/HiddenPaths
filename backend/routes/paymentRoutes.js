import express from "express";
import {
  getPaymentById,
  initiateEsewaPayment,
  verifyEsewaPayment,
  initiateKhaltiPaymentHandler,
  verifyKhaltiPaymentHandler,
  initiateCardPayment,
  verifyCardPayment,
} from "../controllers/paymentController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, getPaymentById);

// Card (real Stripe Checkout sandbox — test mode, hosted-checkout flow)
router.post("/card/initiate", protect, authorizeRoles("user"), initiateCardPayment);
router.post("/card/verify", protect, authorizeRoles("user"), verifyCardPayment);

// eSewa sandbox (v2 form-redirect flow)
router.post("/esewa/initiate", protect, authorizeRoles("user"), initiateEsewaPayment);
router.post("/esewa/verify", protect, authorizeRoles("user"), verifyEsewaPayment);

// Khalti sandbox (ePayment API v2 hosted-checkout flow)
router.post("/khalti/initiate", protect, authorizeRoles("user"), initiateKhaltiPaymentHandler);
router.post("/khalti/verify", protect, authorizeRoles("user"), verifyKhaltiPaymentHandler);

export default router;
