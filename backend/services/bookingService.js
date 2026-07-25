import Experience from "../models/Experience.js";

// Shared booking calculations used by bookingController (and reusable
// elsewhere if the admin panel ever needs to create bookings directly).
export const calculateBookingTotal = (experience, numberOfPeople, extras = []) => {
  const extrasTotal = extras.reduce((sum, e) => sum + (Number(e.price) || 0), 0);
  return experience.price * Number(numberOfPeople) + extrasTotal;
};

export const hasEnoughSeats = (experience, numberOfPeople) =>
  experience.availableSeats >= Number(numberOfPeople);

export default { calculateBookingTotal, hasEnoughSeats };
