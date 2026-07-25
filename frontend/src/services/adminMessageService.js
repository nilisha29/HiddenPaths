import api from "./api";

const adminMessageService = {
  list: () => api.get("/admin/messages"),
  markRead: (id) => api.put(`/admin/messages/${id}/read`),
  remove: (id) => api.delete(`/admin/messages/${id}`),
};

export default adminMessageService;
