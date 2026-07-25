// Shared formatting helpers used across Explore, Experience Detail, Booking,
// Payment, My Bookings, and every admin/guide list page — kept in one place
// so the currency symbol and date style stay consistent everywhere.

export const formatCurrency = (amount) => `NPR ${Number(amount || 0).toLocaleString()}`;

export const formatDate = (date, options = {}) =>
  new Date(date).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  });

export const formatShortDate = (date) =>
  new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

export const formatMonthYear = (date) =>
  new Date(date).toLocaleDateString(undefined, { month: "long", year: "numeric" }).toUpperCase();
