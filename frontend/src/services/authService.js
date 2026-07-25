import api from "./api";

// register accepts a FormData instance so an optional profile image can ride
// along with the rest of the fields (multipart/form-data).
const authService = {
  register: (formData) =>
    api.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  login: (data) => api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
  updateInterests: (interests) => api.put("/auth/interests", { interests }),
};

export default authService;
