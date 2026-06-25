import { http } from "./http.js";

export const UsersApi = {
  getMe() {
    return http.get("/users/me");
  },

  updateMe(data) {
    return http.put("/users/me", data);
  },

  getAll() {
    return http.get("/users");
  },

  getById(id) {
    return http.get(`/users/${id}`);
  },

  create(data) {
    return http.post("/users", data);
  },

  update(id, data) {
    return http.put(`/users/${id}`, data);
  },

  remove(id) {
    return http.delete(`/users/${id}`);
  },
};
