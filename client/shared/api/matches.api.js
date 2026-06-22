import { http } from "./http.js";

export const MatchesApi = {
  getByUserId(userId, filters = {}) {
    const query = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        query.set(key, value);
      }
    });

    const queryString = query.toString();
    const path = `/matches/${userId}${queryString ? `?${queryString}` : ""}`;

    return http.get(path);
  },
};
