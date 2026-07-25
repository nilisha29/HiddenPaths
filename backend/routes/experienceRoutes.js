import express from "express";
import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  getMyExperiences,
} from "../controllers/experienceController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { experienceValidator } from "../utils/validators.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/me/all", protect, authorizeRoles("guide"), getMyExperiences);

router.get("/", getExperiences);
router.get("/:id", getExperienceById);

router.post(
  "/",
  protect,
  authorizeRoles("guide"),
  upload.array("images", 8),
  experienceValidator,
  validate,
  createExperience
);
router.put("/:id", protect, authorizeRoles("guide"), upload.array("images", 8), updateExperience);
router.delete("/:id", protect, authorizeRoles("guide"), deleteExperience);

export default router;
