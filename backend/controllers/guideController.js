import asyncHandler from "express-async-handler";
import Guide from "../models/Guide.js";
import Experience from "../models/Experience.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import createNotification from "../services/notificationService.js";

// @desc    Public guide profile page (must be approved to be visible)
// @route   GET /api/guides/:id
// @access  Public
export const getGuideProfile = asyncHandler(async (req, res) => {
  const guideUser = await User.findOne({
    _id: req.params.id,
    role: "guide",
    guideStatus: "approved",
  });
  if (!guideUser) {
    res.status(404);
    throw new Error("Guide not found");
  }

  const profile = await Guide.findOne({ userId: req.params.id });
  const experiences = await Experience.find({
    guideId: req.params.id,
    isApproved: true,
    isActive: true,
  }).populate("category", "name icon");

  res.json({
    success: true,
    data: {
      user: {
        _id: guideUser._id,
        name: guideUser.name,
        profileImage: guideUser.profileImage,
      },
      profile,
      experiences,
    },
  });
});

// @desc    Logged-in guide's own profile
// @route   GET /api/guides/me/profile
// @access  Private (guide)
export const getMyGuideProfile = asyncHandler(async (req, res) => {
  const profile = await Guide.findOne({ userId: req.user._id });
  res.json({ success: true, data: profile });
});

// @desc    Update logged-in guide's profile (bio, specialties, cover image, etc.)
// @route   PUT /api/guides/me/profile
// @access  Private (guide)
export const updateMyGuideProfile = asyncHandler(async (req, res) => {
  let profile = await Guide.findOne({ userId: req.user._id });
  if (!profile) profile = await Guide.create({ userId: req.user._id });

  const fields = [
    "bio",
    "location",
    "languages",
    "certifications",
    "specialties",
    "yearsOfExperience",
    "socialLinks",
    "responseTime",
  ];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) profile[f] = req.body[f];
  });

  if (req.file) profile.coverImage = `/uploads/${req.file.filename}`;

  await profile.save();
  res.json({ success: true, data: profile });
});

// @desc    Bookings across all of the logged-in guide's experiences
// @route   GET /api/guides/me/bookings
// @access  Private (guide)
export const getMyGuideBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ guideId: req.user._id })
    .populate("experienceId", "title images")
    .populate("userId", "name email phone profileImage")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: bookings.length, data: bookings });
});

// @desc    Confirm / cancel / complete a booking request
// @route   PUT /api/guides/me/bookings/:id
// @access  Private (guide)
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  if (booking.guideId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this booking");
  }

  booking.status = status;
  await booking.save();

  await createNotification({
    userId: booking.userId,
    type: status === "confirmed" ? "booking_confirmed" : "booking_cancelled",
    message:
      status === "confirmed"
        ? "Your booking has been confirmed by the host."
        : `Your booking status was updated to ${status}.`,
    link: "/bookings",
  });

  res.json({ success: true, data: booking });
});

// @desc    Guide earnings dashboard (simple calculation)
// @route   GET /api/guides/me/earnings
// @access  Private (guide)
export const getMyEarnings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    guideId: req.user._id,
    status: { $in: ["confirmed", "completed"] },
  });

  const totalEarnings = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const experiences = await Experience.find({ guideId: req.user._id });
  const pendingCount = await Booking.countDocuments({ guideId: req.user._id, status: "pending" });

  // Monthly revenue for the last 6 months (for a simple chart)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);

  const monthlyRevenue = await Booking.aggregate([
    {
      $match: {
        guideId: req.user._id,
        status: { $in: ["confirmed", "completed"] },
        createdAt: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        total: { $sum: "$totalPrice" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  res.json({
    success: true,
    data: {
      totalEarnings,
      totalBookings: bookings.length,
      totalExperiences: experiences.length,
      pendingBookings: pendingCount,
      completedExperiences: bookings.filter((b) => b.status === "completed").length,
      monthlyRevenue,
    },
  });
});

// @desc    Reviews left on any of the logged-in guide's experiences
// @route   GET /api/guides/me/reviews
// @access  Private (guide)
export const getMyReceivedReviews = asyncHandler(async (req, res) => {
  const experiences = await Experience.find({ guideId: req.user._id }).select("_id");
  const reviews = await Review.find({ experienceId: { $in: experiences.map((e) => e._id) } })
    .populate("userId", "name profileImage")
    .populate("experienceId", "title")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: reviews.length, data: reviews });
});
