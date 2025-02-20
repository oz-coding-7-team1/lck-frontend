import axios from "axios";

const BASE_URL = "http://43.200.180.205/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

