import api from "./api";

const userService = {
  homeSummary: () => api.get("/users/home-summary"),
  updateProfile: (formData) =>
    api.put("/users/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  myBookings: () => api.get("/users/bookings"),
  wishlist: () => api.get("/users/wishlist"),
  addToWishlist: (experienceId) => api.post(`/users/wishlist/${experienceId}`),
  removeFromWishlist: (experienceId) => api.delete(`/users/wishlist/${experienceId}`),
};

export default userService;
