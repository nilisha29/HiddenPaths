import express from "express";
import { registerUser, loginUser, getMe, updateInterests } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { registerValidator, loginValidator } from "../utils/validators.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Single register endpoint for both traveler and guide sign-up (same form,
// branches on the `isGuide` flag) — profile image is optional.
router.post("/register", upload.single("profileImage"), registerValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);
router.get("/me", protect, getMe);
router.put("/interests", protect, updateInterests);

export default router;
