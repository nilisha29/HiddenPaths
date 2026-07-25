import api from "./api";

const reviewService = {
  forExperience: (experienceId) => api.get(`/reviews/experience/${experienceId}`),
  create: (formData) =>
    api.post("/reviews", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  reply: (id, reply) => api.put(`/reviews/${id}/reply`, { reply }),
  remove: (id) => api.delete(`/reviews/${id}`),
};

export default reviewService;
