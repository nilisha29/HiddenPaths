const express = require('express');
const router = express.Router();

// 1. Import the protect middleware
const { protect } = require('../middleware/authMiddleware');

// 2. Import your booking controller methods (we'll make these later)
// const { createNewBooking, getUserBookings } = require('../controllers/bookingController');

// 3. Apply 'protect' to specific endpoints
// Anyone can view available slots, so NO 'protect' middleware here:
router.get('/availability', (req, res) => res.send('Available slots data'));

// ONLY logged-in users can create a booking, so we add 'protect' right in the middle:
router.post('/create', protect, (req, res) => {
  // Because 'protect' ran first, you safely have access to the logged-in user's data here:
  res.json({
    message: 'Booking route accessed successfully!',
    authenticatedUser: req.user // Contains user id, name, and email from the DB
  });
});

module.exports = router;