import express from "express";
import { createBooking, getBookingById, cancelBooking } from "../controllers/bookingController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { bookingValidator } from "../utils/validators.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("user"), bookingValidator, validate, createBooking);
router.get("/:id", protect, getBookingById);
router.put("/:id/cancel", protect, authorizeRoles("user"), cancelBooking);

export default router;
