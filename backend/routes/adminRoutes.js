import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  toggleBlockUser,
  deleteUser,
  getAllGuides,
  getGuideById,
  createGuide,
  deleteGuide,
  updateGuideStatus,
  adminUpdateGuideProfile,
  getAllExperiences,
  approveExperience,
  removeExperience,
  toggleFeatureExperience,
  adminCreateExperience,
  adminUpdateExperience,
  adminDeleteExperience,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getAllPayments,
  updatePayment,
  deletePayment,
  getAllReviews,
  adminDeleteReview,
  getSettings,
  updateSettings,
} from "../controllers/adminController.js";
import {
  getAllContactMessages,
  markContactMessageRead,
  deleteContactMessage,
} from "../controllers/contactController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect, authorizeRoles("admin"));

router.get("/stats", getDashboardStats);

// Users
router.get("/users", getAllUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.put("/users/:id/block", toggleBlockUser);
router.delete("/users/:id", deleteUser);

// Guides
router.get("/guides", getAllGuides);
router.post("/guides", createGuide);
router.get("/guides/:id", getGuideById);
router.delete("/guides/:id", deleteGuide);
router.put("/guides/:id/status", updateGuideStatus);
router.put("/guides/:id/profile", adminUpdateGuideProfile);

// Experiences
router.get("/experiences", getAllExperiences);
router.post("/experiences", upload.array("images", 8), adminCreateExperience);
router.put("/experiences/:id", upload.array("images", 8), adminUpdateExperience);
router.delete("/experiences/:id", adminDeleteExperience);
router.put("/experiences/:id/approve", approveExperience);
router.put("/experiences/:id/remove", removeExperience);
router.put("/experiences/:id/feature", toggleFeatureExperience);

// Bookings
router.get("/bookings", getAllBookings);
router.put("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);

// Payments
router.get("/payments", getAllPayments);
router.put("/payments/:id", updatePayment);
router.delete("/payments/:id", deletePayment);

// Reviews
router.get("/reviews", getAllReviews);
router.delete("/reviews/:id", adminDeleteReview);

// Settings
router.get("/settings", getSettings);
router.put("/settings", updateSettings);

// Contact form inbox
router.get("/messages", getAllContactMessages);
router.put("/messages/:id/read", markContactMessageRead);
router.delete("/messages/:id", deleteContactMessage);

export default router;
