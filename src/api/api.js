import axios from "axios";

// Base URL of the Servixa backend
export const BASE_URL = "https://servixa.runasp.net";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tc");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.title ||
      (typeof error?.response?.data === "string" ? error.response.data : null) ||
      error?.message ||
      "حدث خطأ غير متوقع، حاول مرة أخرى";
    return Promise.reject({ ...error, message });
  }
);

export default api;