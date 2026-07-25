import Notification from "../models/Notification.js";

// Fire-and-forget helper used across controllers to raise a notification
// for a user without blocking the main response flow.
export const createNotification = async ({ userId, type, message, link = "" }) => {
  try {
    await Notification.create({ userId, type, message, link });
  } catch (error) {
    console.error("Failed to create notification:", error.message);
  }
};

export default createNotification;
