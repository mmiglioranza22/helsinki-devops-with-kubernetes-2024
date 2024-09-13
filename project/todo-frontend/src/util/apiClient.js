import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8081"; // dev port or k3d port (serve-vite can't run this since vite env is not being mapped there)
const apiClient = axios.create({
  baseURL: baseUrl,
  // process.env.VITE_BACKEND_URL ||
  // import.meta.env.VITE_BACKEND_URL ||
  // "http://localhost:5555",
});

// const apiClient = axios.create({
//   baseURL: import.meta.env.PROD
//     ? import.meta.env.VITE_BACKEND_URL_PROD
//     : import.meta.env.VITE_BACKEND_URL,
// });

export default apiClient;
