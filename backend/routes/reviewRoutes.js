import express from "express";
import {
  createReview,
  getReviewsForExperience,
  replyToReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/experience/:experienceId", getReviewsForExperience);
router.post("/", protect, authorizeRoles("user"), upload.array("images", 4), createReview);
router.put("/:id/reply", protect, authorizeRoles("guide"), replyToReview);
router.delete("/:id", protect, authorizeRoles("user"), deleteReview);

export default router;
