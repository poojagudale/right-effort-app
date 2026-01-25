import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081",
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getUserRole = () => API.get("/user/role");
export const addNewUser = (data) => API.post("/api/users/add", data);
