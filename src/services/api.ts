import axios from "axios";

const BASE_URL = "https://api.umdoong.shop/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
