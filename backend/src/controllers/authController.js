const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const signToken = (user) => jwt.sign(
  { id: user._id, email: user.email },
  process.env.JWT_SECRET || 'hiddenpaths-secret',
  { expiresIn: '7d' }
)

// POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body
  if (!fullName || !email || !password) {
    res.status(400)
    throw new Error('Please provide fullName, email and password')
  }

  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) {
    res.status(409)
    throw new Error('User already exists')
  }

  const user = new User({ fullName, email, password })
  await user.save()

  res.status(201).json({ userId: user._id, fullName: user.fullName })
})

// POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide email and password')
  }

  const user = await User.findOne({ email: email.toLowerCase() })
  if (!user) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.json({
    message: 'Login successful',
    token: signToken(user),
    user: { userId: user._id, fullName: user.fullName, email: user.email },
  })
})

module.exports = { registerUser, loginUser }
