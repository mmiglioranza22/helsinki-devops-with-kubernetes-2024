import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8081",
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
