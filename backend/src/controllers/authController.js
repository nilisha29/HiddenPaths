// const asyncHandler = require('express-async-handler')
// const jwt = require('jsonwebtoken')
// const User = require('../models/User')

// const signToken = (user) => jwt.sign(
//   { id: user._id, email: user.email },
//   process.env.JWT_SECRET || 'hiddenpaths-secret',
//   { expiresIn: '7d' }
// )

// // POST /api/auth/register
// const registerUser = asyncHandler(async (req, res) => {
//   const { fullName, email, password } = req.body
//   if (!fullName || !email || !password) {
//     res.status(400)
//     throw new Error('Please provide fullName, email and password')
//   }

//   const existing = await User.findOne({ email: email.toLowerCase() })
//   if (existing) {
//     res.status(409)
//     throw new Error('User already exists')
//   }

//   const user = new User({ fullName, email, password })
//   await user.save()

//   res.status(201).json({ userId: user._id, fullName: user.fullName })
// })

// // POST /api/auth/login
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body

//   if (!email || !password) {
//     res.status(400)
//     throw new Error('Please provide email and password')
//   }

//   const user = await User.findOne({ email: email.toLowerCase() })
//   if (!user) {
//     res.status(401)
//     throw new Error('Invalid email or password')
//   }

//   const isMatch = await user.comparePassword(password)
//   if (!isMatch) {
//     res.status(401)
//     throw new Error('Invalid email or password')
//   }

//   res.json({
//     message: 'Login successful',
//     token: signToken(user),
//     user: { userId: user._id, fullName: user.fullName, email: user.email },
//   })
// })

// module.exports = { registerUser, loginUser }


const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper Function: Sign token with expiration policy
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists in the system
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create entry
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Explicitly select the hidden password field for validation matching
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify cryptographic matching
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
