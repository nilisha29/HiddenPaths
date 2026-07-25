import express from "express";
import {
  updateProfile,
  getMyBookings,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getHomeSummary,
} from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect, authorizeRoles("user"));

router.get("/home-summary", getHomeSummary);
router.put("/profile", upload.single("profileImage"), updateProfile);
router.get("/bookings", getMyBookings);
router.get("/wishlist", getWishlist);
router.post("/wishlist/:experienceId", addToWishlist);
router.delete("/wishlist/:experienceId", removeFromWishlist);

export default router;
