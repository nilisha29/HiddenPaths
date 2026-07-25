import asyncHandler from "express-async-handler";
import ContactMessage from "../models/ContactMessage.js";

// @desc    Submit the public Contact page form
// @route   POST /api/contact
// @access  Public
export const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email, and message are required");
  }
  const contactMessage = await ContactMessage.create({ name, email, subject, message });
  res.status(201).json({ success: true, data: contactMessage });
});

// @desc    List all contact messages (admin inbox)
// @route   GET /api/admin/messages
// @access  Private (admin)
export const getAllContactMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ success: true, count: messages.length, data: messages });
});

// @desc    Mark a contact message as read
// @route   PUT /api/admin/messages/:id/read
// @access  Private (admin)
export const markContactMessageRead = asyncHandler(async (req, res) => {
  const contactMessage = await ContactMessage.findById(req.params.id);
  if (!contactMessage) {
    res.status(404);
    throw new Error("Message not found");
  }
  contactMessage.isRead = true;
  await contactMessage.save();
  res.json({ success: true, data: contactMessage });
});

// @desc    Delete a contact message
// @route   DELETE /api/admin/messages/:id
// @access  Private (admin)
export const deleteContactMessage = asyncHandler(async (req, res) => {
  const contactMessage = await ContactMessage.findById(req.params.id);
  if (!contactMessage) {
    res.status(404);
    throw new Error("Message not found");
  }
  await contactMessage.deleteOne();
  res.json({ success: true, message: "Message deleted" });
});
