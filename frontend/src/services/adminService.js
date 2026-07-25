import api from "./api";

const adminService = {
  stats: () => api.get("/admin/stats"),

  // Users
  users: () => api.get("/admin/users"),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  createUser: (data) => api.post("/admin/users", data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  toggleBlockUser: (id) => api.put(`/admin/users/${id}/block`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),

  // Guides
  guides: () => api.get("/admin/guides"),
  getGuideById: (id) => api.get(`/admin/guides/${id}`),
  createGuide: (data) => api.post("/admin/guides", data),
  deleteGuide: (id) => api.delete(`/admin/guides/${id}`),
  updateGuideStatus: (id, status) => api.put(`/admin/guides/${id}/status`, { status }),
  updateGuideProfile: (id, data) => api.put(`/admin/guides/${id}/profile`, data),

  // Experiences
  experiences: () => api.get("/admin/experiences"),
  createExperience: (formData) =>
    api.post("/admin/experiences", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  updateExperience: (id, formData) =>
    api.put(`/admin/experiences/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }),
  deleteExperience: (id) => api.delete(`/admin/experiences/${id}`),
  approveExperience: (id) => api.put(`/admin/experiences/${id}/approve`),
  removeExperience: (id) => api.put(`/admin/experiences/${id}/remove`),
  featureExperience: (id) => api.put(`/admin/experiences/${id}/feature`),

  // Bookings
  bookings: () => api.get("/admin/bookings"),
  updateBooking: (id, data) => api.put(`/admin/bookings/${id}`, data),
  deleteBooking: (id) => api.delete(`/admin/bookings/${id}`),

  // Payments
  payments: () => api.get("/admin/payments"),
  updatePayment: (id, data) => api.put(`/admin/payments/${id}`, data),
  deletePayment: (id) => api.delete(`/admin/payments/${id}`),

  // Reviews
  reviews: () => api.get("/admin/reviews"),
  deleteReview: (id) => api.delete(`/admin/reviews/${id}`),

  // Settings
  getSettings: () => api.get("/admin/settings"),
  updateSettings: (data) => api.put("/admin/settings", data),
};

export default adminService;
