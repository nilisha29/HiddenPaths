import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Guide from "../models/Guide.js";
import generateToken from "../utils/generateToken.js";

const buildImagePath = (file) => (file ? `/uploads/${file.filename}` : "");

// @desc    Register (traveler by default, or guide when isGuide=true is sent)
//          Same form/UI powers both — this endpoint branches on role.
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, isGuide, bio, location } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }

  const wantsGuide = isGuide === "true" || isGuide === true;

  const user = await User.create({
    name,
    email,
    password,
    phone,
    profileImage: buildImagePath(req.file),
    role: wantsGuide ? "guide" : "user",
    guideStatus: wantsGuide ? "pending" : "not_applicable",
  });

  if (wantsGuide) {
    await Guide.create({
      userId: user._id,
      bio: bio || "",
      location: location || "",
    });
  }

  res.status(201).json({
    success: true,
    message: wantsGuide
      ? "Guide account created. Your account is pending admin approval before you can publish experiences."
      : "Account created successfully.",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      guideStatus: user.guideStatus,
      interests: user.interests,
      token: generateToken(user._id, user.role),
    },
  });
});

// @desc    Login — same form for user / guide / admin, role comes back from DB
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (user.isBlocked) {
    res.status(403);
    throw new Error("Your account has been blocked. Contact support.");
  }

  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      guideStatus: user.guideStatus,
      interests: user.interests,
      token: generateToken(user._id, user.role),
    },
  });
});

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ success: true, data: user });
});

// @desc    Save interests picked on the post-registration Welcome screen
// @route   PUT /api/auth/interests
// @access  Private
export const updateInterests = asyncHandler(async (req, res) => {
  const { interests } = req.body;
  const user = await User.findById(req.user._id);
  user.interests = Array.isArray(interests) ? interests : [];
  await user.save();
  res.json({ success: true, data: user });
});
