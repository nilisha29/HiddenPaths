const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header (Format: Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Split "Bearer" and the token string
      token = req.headers.authorization.split(' ')[1];

      // Verify token authenticity against your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user from database using decoded payload id and attach it to the request object
      req.user = await User.findById(decoded.id);

      return next(); // Move forward to the controller
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};