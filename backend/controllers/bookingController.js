import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";
import createNotification from "../services/notificationService.js";
import { calculateBookingTotal, hasEnoughSeats } from "../services/bookingService.js";

// @desc    Create a new booking (status starts pending / unpaid until payment step)
// @route   POST /api/bookings
// @access  Private (user)
export const createBooking = asyncHandler(async (req, res) => {
  const { experienceId, date, numberOfPeople, contactPhone, notes, extras, fullName, email } =
    req.body;

  const experience = await Experience.findById(experienceId);
  if (!experience || !experience.isApproved || !experience.isActive) {
    res.status(404);
    throw new Error("Experience not available for booking");
  }

  if (!hasEnoughSeats(experience, numberOfPeople)) {
    res.status(400);
    throw new Error("Not enough seats available for this date");
  }

  const extrasList = Array.isArray(extras) ? extras : [];
  const totalPrice = calculateBookingTotal(experience, numberOfPeople, extrasList);

  const booking = await Booking.create({
    userId: req.user._id,
    experienceId,
    guideId: experience.guideId,
    date,
    numberOfPeople,
    extras: extrasList,
    totalPrice,
    contactPhone,
    notes,
    fullName: fullName || req.user.name,
    email: email || req.user.email,
  });

  await createNotification({
    userId: experience.guideId,
    type: "booking_created",
    message: `New booking request for "${experience.title}".`,
    link: "/guide/bookings",
  });

  res.status(201).json({ success: true, data: booking });
});

// @desc    Get a single booking (owner user / owning guide / admin only)
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("experienceId")
    .populate("userId", "name email phone")
    .populate("guideId", "name email profileImage");

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  const isOwner = booking.userId._id.toString() === req.user._id.toString();
  const isGuide = booking.guideId._id.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isGuide && !isAdmin) {
    res.status(403);
    throw new Error("Not authorized to view this booking");
  }

  res.json({ success: true, data: booking });
});

// @desc    Cancel own booking (only if it's more than 48h before the date)
// @route   PUT /api/bookings/:id/cancel
// @access  Private (user)
export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  if (booking.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to cancel this booking");
  }

  const hoursUntil = (new Date(booking.date) - new Date()) / (1000 * 60 * 60);
  if (hoursUntil < 48) {
    res.status(400);
    throw new Error("Bookings can only be cancelled up to 48 hours before the start date");
  }

  booking.status = "cancelled";
  await booking.save();

  await createNotification({
    userId: booking.guideId,
    type: "booking_cancelled",
    message: "A guest cancelled their booking.",
    link: "/guide/bookings",
  });

  res.json({ success: true, data: booking });
});
