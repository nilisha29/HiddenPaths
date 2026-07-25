import api from "./api";

const journalService = {
  list: (params) => api.get("/journals", { params }),
  getById: (id) => api.get(`/journals/${id}`),
  create: (formData) =>
    api.post("/journals", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  update: (id, formData) =>
    api.put(`/journals/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } }),
  remove: (id) => api.delete(`/journals/${id}`),
};

export default journalService;
