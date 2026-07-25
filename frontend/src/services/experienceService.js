import api from "./api";

const experienceService = {
  list: (params) => api.get("/experiences", { params }),
  getById: (id) => api.get(`/experiences/${id}`),
  create: (formData) =>
    api.post("/experiences", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  update: (id, formData) =>
    api.put(`/experiences/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  remove: (id) => api.delete(`/experiences/${id}`),
  mine: () => api.get("/experiences/me/all"),
};

export default experienceService;
