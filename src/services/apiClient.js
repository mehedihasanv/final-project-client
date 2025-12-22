

// src/services/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Optional: attach errors globally or tokens if needed later
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // You can show a toast here if desired
    return Promise.reject(err);
  }
);

export default api;
