import { http } from "./http.js";

export const PropertiesApi = {
  getAll() {
    return http.get("/properties");
  },

  create(data) {
    return http.post("/properties", data);
  },

  getById(id) {
    return http.get(`/properties/${id}`);
  },
};
