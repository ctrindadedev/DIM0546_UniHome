import { ApiClient } from "./api-client.js";

const API_BASE_URL = "http://localhost:3001/api";

export const http = new ApiClient(API_BASE_URL);
