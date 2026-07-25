import express from "express";
import {
  getJournals,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getJournals);
router.get("/:id", getJournalById);
router.post("/", protect, authorizeRoles("admin"), upload.single("image"), createJournal);
router.put("/:id", protect, authorizeRoles("admin"), upload.single("image"), updateJournal);
router.delete("/:id", protect, authorizeRoles("admin"), deleteJournal);

export default router;
