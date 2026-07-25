import express from "express";
import {
  getGuideProfile,
  getMyGuideProfile,
  updateMyGuideProfile,
  getMyGuideBookings,
  updateBookingStatus,
  getMyEarnings,
  getMyReceivedReviews,
} from "../controllers/guideController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Guide-only dashboard routes (declared BEFORE "/:id" to avoid shadowing)
router.get("/me/profile", protect, authorizeRoles("guide"), getMyGuideProfile);
router.put(
  "/me/profile",
  protect,
  authorizeRoles("guide"),
  upload.single("coverImage"),
  updateMyGuideProfile
);
router.get("/me/bookings", protect, authorizeRoles("guide"), getMyGuideBookings);
router.put("/me/bookings/:id", protect, authorizeRoles("guide"), updateBookingStatus);
router.get("/me/earnings", protect, authorizeRoles("guide"), getMyEarnings);
router.get("/me/reviews", protect, authorizeRoles("guide"), getMyReceivedReviews);

// Public
router.get("/:id", getGuideProfile);

export default router;
