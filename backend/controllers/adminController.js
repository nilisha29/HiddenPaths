import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Experience from "../models/Experience.js";
import Booking from "../models/Booking.js";
import Guide from "../models/Guide.js";
import Payment from "../models/Payment.js";
import Review from "../models/Review.js";
import Settings from "../models/Settings.js";
import createNotification from "../services/notificationService.js";

// @desc    Dashboard stats + 6-month booking/revenue chart data
// @route   GET /api/admin/stats
// @access  Private (admin)
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalGuides,
    totalExperiences,
    totalBookings,
    pendingGuides,
    pendingExperiences,
    revenueAgg,
  ] = await Promise.all([
    User.countDocuments({ role: "user" }),
    User.countDocuments({ role: "guide" }),
    Experience.countDocuments(),
    Booking.countDocuments(),
    User.countDocuments({ role: "guide", guideStatus: "pending" }),
    Experience.countDocuments({ isApproved: false }),
    Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);

  const bookingsByMonth = await Booking.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      totalGuides,
      totalExperiences,
      totalBookings,
      pendingGuides,
      pendingExperiences,
      totalRevenue: revenueAgg[0]?.total || 0,
      bookingsByMonth,
    },
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, data: users });
});

// @desc    View a single user's detail, including their booking history
// @route   GET /api/admin/users/:id
// @access  Private (admin)
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const bookings = await Booking.find({ userId: user._id })
    .populate("experienceId", "title")
    .sort({ createdAt: -1 });
  res.json({ success: true, data: { user, bookings } });
});

// @desc    Admin creates a traveler account directly
// @route   POST /api/admin/users
// @access  Private (admin)
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }
  const user = await User.create({ name, email, password, phone, role: "user" });
  res.status(201).json({ success: true, data: user });
});

// @desc    Admin edits a user's basic details
// @route   PUT /api/admin/users/:id
// @access  Private (admin)
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const fields = ["name", "phone", "email"];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) user[f] = req.body[f];
  });
  await user.save();
  res.json({ success: true, data: user });
});

export const toggleBlockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.isBlocked = !user.isBlocked;
  await user.save();
  res.json({ success: true, data: user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.json({ success: true, message: "User deleted" });
});

export const getAllGuides = asyncHandler(async (req, res) => {
  const guides = await User.find({ role: "guide" }).sort({ createdAt: -1 });
  res.json({ success: true, count: guides.length, data: guides });
});

// @desc    View a single guide's detail: account + profile + experiences + stats
// @route   GET /api/admin/guides/:id
// @access  Private (admin)
export const getGuideById = asyncHandler(async (req, res) => {
  const guide = await User.findOne({ _id: req.params.id, role: "guide" });
  if (!guide) {
    res.status(404);
    throw new Error("Guide not found");
  }
  const [profile, experiences, bookings] = await Promise.all([
    Guide.findOne({ userId: guide._id }),
    Experience.find({ guideId: guide._id }),
    Booking.find({ guideId: guide._id }),
  ]);
  res.json({ success: true, data: { guide, profile, experiences, bookings } });
});

// @desc    Admin creates a guide account directly (pre-approved)
// @route   POST /api/admin/guides
// @access  Private (admin)
export const createGuide = asyncHandler(async (req, res) => {
  const { name, email, password, phone, bio, location } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }
  const guide = await User.create({
    name,
    email,
    password,
    phone,
    role: "guide",
    guideStatus: "approved",
  });
  await Guide.create({ userId: guide._id, bio: bio || "", location: location || "" });
  res.status(201).json({ success: true, data: guide });
});

// @desc    Admin permanently deletes a guide account and their profile
// @route   DELETE /api/admin/guides/:id
// @access  Private (admin)
export const deleteGuide = asyncHandler(async (req, res) => {
  const guide = await User.findOne({ _id: req.params.id, role: "guide" });
  if (!guide) {
    res.status(404);
    throw new Error("Guide not found");
  }
  await Guide.findOneAndDelete({ userId: guide._id });
  await guide.deleteOne();
  res.json({ success: true, message: "Guide deleted" });
});

export const updateGuideStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // approved | rejected
  const guide = await User.findOne({ _id: req.params.id, role: "guide" });
  if (!guide) {
    res.status(404);
    throw new Error("Guide not found");
  }
  guide.guideStatus = status;
  await guide.save();

  await createNotification({
    userId: guide._id,
    type: status === "approved" ? "guide_approved" : "guide_rejected",
    message:
      status === "approved"
        ? "Congratulations! Your guide account has been approved."
        : "Your guide application was not approved this time.",
    link: "/guide/dashboard",
  });

  res.json({ success: true, data: guide });
});

// @desc    Admin edits any guide's public profile
// @route   PUT /api/admin/guides/:id/profile
// @access  Private (admin)
export const adminUpdateGuideProfile = asyncHandler(async (req, res) => {
  let profile = await Guide.findOne({ userId: req.params.id });
  if (!profile) {
    res.status(404);
    throw new Error("Guide profile not found");
  }
  const fields = [
    "bio",
    "location",
    "languages",
    "certifications",
    "specialties",
    "yearsOfExperience",
    "isVerified",
  ];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) profile[f] = req.body[f];
  });
  await profile.save();
  res.json({ success: true, data: profile });
});

export const getAllExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find()
    .populate("category", "name")
    .populate("guideId", "name email")
    .sort({ createdAt: -1 });
  res.json({ success: true, count: experiences.length, data: experiences });
});

export const approveExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }
  experience.isApproved = true;
  experience.status = "published";
  await experience.save();

  await createNotification({
    userId: experience.guideId,
    type: "experience_approved",
    message: `Your experience "${experience.title}" has been approved and is now live.`,
    link: "/guide/experiences",
  });

  res.json({ success: true, data: experience });
});

export const removeExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }
  experience.isActive = false;
  experience.isApproved = false;
  experience.status = "archived";
  await experience.save();

  await createNotification({
    userId: experience.guideId,
    type: "experience_removed",
    message: `Your experience "${experience.title}" was removed by the admin.`,
    link: "/guide/experiences",
  });

  res.json({ success: true, data: experience });
});

export const toggleFeatureExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }
  experience.isFeatured = !experience.isFeatured;
  await experience.save();
  res.json({ success: true, data: experience });
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate("userId", "name email")
    .populate("guideId", "name email")
    .populate("experienceId", "title")
    .sort({ createdAt: -1 });
  res.json({ success: true, count: bookings.length, data: bookings });
});

// @desc    Admin edits a booking (status, date, guest count)
// @route   PUT /api/admin/bookings/:id
// @access  Private (admin)
export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  const fields = ["status", "date", "numberOfPeople", "paymentStatus"];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) booking[f] = req.body[f];
  });
  await booking.save();
  res.json({ success: true, data: booking });
});

// @desc    Admin permanently deletes a booking
// @route   DELETE /api/admin/bookings/:id
// @access  Private (admin)
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  await booking.deleteOne();
  res.json({ success: true, message: "Booking deleted" });
});

// @desc    Get all payment records
// @route   GET /api/admin/payments
// @access  Private (admin)
export const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find()
    .populate("userId", "name email")
    .populate({ path: "bookingId", populate: { path: "experienceId", select: "title" } })
    .sort({ createdAt: -1 });
  res.json({ success: true, count: payments.length, data: payments });
});

// @desc    Admin edits a payment record (e.g. mark as refunded)
// @route   PUT /api/admin/payments/:id
// @access  Private (admin)
export const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }
  if (req.body.status !== undefined) payment.status = req.body.status;
  await payment.save();

  if (req.body.status === "failed" && payment.bookingId) {
    await Booking.findByIdAndUpdate(payment.bookingId, { paymentStatus: "refunded" });
  }

  res.json({ success: true, data: payment });
});

// @desc    Admin deletes a payment record
// @route   DELETE /api/admin/payments/:id
// @access  Private (admin)
export const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }
  await payment.deleteOne();
  res.json({ success: true, message: "Payment deleted" });
});

// @desc    Get all reviews across the platform (moderation queue)
// @route   GET /api/admin/reviews
// @access  Private (admin)
export const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate("userId", "name email")
    .populate("experienceId", "title")
    .sort({ createdAt: -1 });
  res.json({ success: true, count: reviews.length, data: reviews });
});

// @desc    Admin removes an inappropriate review
// @route   DELETE /api/admin/reviews/:id
// @access  Private (admin)
export const adminDeleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  const experience = await Experience.findById(review.experienceId);
  await review.deleteOne();

  if (experience) {
    experience.reviews = experience.reviews.filter((r) => r.toString() !== req.params.id);
    const remaining = await Review.find({ experienceId: experience._id });
    const numReviews = remaining.length;
    const rating = numReviews > 0 ? remaining.reduce((s, r) => s + r.rating, 0) / numReviews : 0;
    experience.rating = rating.toFixed(1);
    experience.numReviews = numReviews;
    await experience.save();
  }

  res.json({ success: true, message: "Review removed" });
});

// @desc    Get platform settings (creates the singleton document on first use)
// @route   GET /api/admin/settings
// @access  Private (admin)
export const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  res.json({ success: true, data: settings });
});

// @desc    Update platform settings
// @route   PUT /api/admin/settings
// @access  Private (admin)
export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = new Settings();

  const fields = [
    "platformName",
    "supportEmail",
    "commissionRate",
    "bookingCancellationWindowHours",
    "maintenanceMode",
    "announcement",
  ];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) settings[f] = req.body[f];
  });

  await settings.save();
  res.json({ success: true, data: settings });
});

// @desc    Admin creates an experience directly, assigned to a chosen guide.
//          Published immediately (admin-authored content is pre-approved).
// @route   POST /api/admin/experiences
// @access  Private (admin)
export const adminCreateExperience = asyncHandler(async (req, res) => {
  const { guideId } = req.body;
  if (!guideId) {
    res.status(400);
    throw new Error("Please select which guide this experience belongs to");
  }

  const guide = await User.findOne({ _id: guideId, role: "guide" });
  if (!guide) {
    res.status(404);
    throw new Error("Selected guide not found");
  }

  const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];
  const payload = { ...req.body, guideId, isApproved: true, status: "published" };

  ["highlights", "included", "excluded", "itinerary", "faqs", "availableDates"].forEach((f) => {
    if (typeof payload[f] === "string") {
      try {
        payload[f] = JSON.parse(payload[f]);
      } catch {
        payload[f] = payload[f].split(",").map((s) => s.trim()).filter(Boolean);
      }
    }
  });
  if (images.length > 0) payload.images = images;

  const experience = await Experience.create(payload);

  await Guide.findOneAndUpdate(
    { userId: guideId },
    { $push: { experiences: experience._id } }
  );

  res.status(201).json({ success: true, data: experience });
});

// @desc    Admin edits any experience directly (no ownership check, no
//          re-approval needed since the admin is the approver).
// @route   PUT /api/admin/experiences/:id
// @access  Private (admin)
export const adminUpdateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }

  const updatableFields = [
    "title",
    "description",
    "price",
    "location",
    "meetingPoint",
    "latitude",
    "longitude",
    "category",
    "guideId",
    "duration",
    "durationDays",
    "groupSize",
    "availableSeats",
    "highlights",
    "included",
    "excluded",
    "itinerary",
    "faqs",
    "availableDates",
    "cancellationPolicy",
    "isActive",
    "isApproved",
    "status",
  ];

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      let value = req.body[field];
      if (
        ["highlights", "included", "excluded", "itinerary", "faqs", "availableDates"].includes(field) &&
        typeof value === "string"
      ) {
        try {
          value = JSON.parse(value);
        } catch {
          value = value.split(",").map((s) => s.trim()).filter(Boolean);
        }
      }
      experience[field] = value;
    }
  });

  if (req.files && req.files.length > 0) {
    experience.images = req.files.map((f) => `/uploads/${f.filename}`);
  }

  const updated = await experience.save();
  res.json({ success: true, data: updated });
});

// @desc    Admin permanently deletes an experience
// @route   DELETE /api/admin/experiences/:id
// @access  Private (admin)
export const adminDeleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }
  await experience.deleteOne();
  await Guide.findOneAndUpdate(
    { userId: experience.guideId },
    { $pull: { experiences: experience._id } }
  );
  res.json({ success: true, message: "Experience deleted" });
});
