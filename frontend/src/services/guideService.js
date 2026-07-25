import api from "./api";

const guideService = {
  getProfile: (id) => api.get(`/guides/${id}`),
  myProfile: () => api.get("/guides/me/profile"),
  updateMyProfile: (formData) =>
    api.put("/guides/me/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  myBookings: () => api.get("/guides/me/bookings"),
  updateBookingStatus: (id, status) => api.put(`/guides/me/bookings/${id}`, { status }),
  myEarnings: () => api.get("/guides/me/earnings"),
  myReviews: () => api.get("/guides/me/reviews"),
};

export default guideService;
