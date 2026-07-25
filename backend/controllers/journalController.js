import asyncHandler from "express-async-handler";
import Journal from "../models/Journal.js";

export const getJournals = asyncHandler(async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const query = { isPublished: true };

  const [journals, total] = await Promise.all([
    Journal.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Journal.countDocuments(query),
  ]);

  res.json({
    success: true,
    count: journals.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: journals,
  });
});

export const getJournalById = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);
  if (!journal) {
    res.status(404);
    throw new Error("Journal post not found");
  }
  res.json({ success: true, data: journal });
});

export const createJournal = asyncHandler(async (req, res) => {
  const { title, content, excerpt, authorName, visitedLocation, authorImage } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || "";

  const journal = await Journal.create({
    title,
    content,
    excerpt,
    image,
    authorName: authorName || req.user.name,
    authorImage: authorImage || "",
    visitedLocation,
    authorId: req.user._id,
  });
  res.status(201).json({ success: true, data: journal });
});

export const updateJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);
  if (!journal) {
    res.status(404);
    throw new Error("Journal post not found");
  }
  const fields = ["title", "content", "excerpt", "authorName", "visitedLocation", "authorImage", "isPublished"];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) journal[f] = req.body[f];
  });
  if (req.file) journal.image = `/uploads/${req.file.filename}`;
  const updated = await journal.save();
  res.json({ success: true, data: updated });
});

export const deleteJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);
  if (!journal) {
    res.status(404);
    throw new Error("Journal post not found");
  }
  await journal.deleteOne();
  res.json({ success: true, message: "Journal post deleted" });
});
