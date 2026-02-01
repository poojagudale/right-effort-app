import axios from "axios";

// ✅ Configure Axios instance
const API = axios.create({
  baseURL: "http://localhost:8081", // adjust if backend runs on different port
  withCredentials: true,            // ✅ ensures cookies/session/JWT are sent
});

// ✅ Dashboard: Add new basic user
export const addBasicUser = (data) => API.post("/api/users/basic", data);

// ✅ Dashboard: Update user by email
export const updateUserByEmail = (data) => API.post("/api/users/update", data);

// ✅ Logged-in user's profile
export const getUserProfile = () => API.get("/api/users/profile");

// ✅ Fetch user by email (admin/dashboard use)
// If your backend expects `/api/users/{email}`, keep as is.
// If you prefer clearer REST, change backend to `/api/users/email/{email}`
export const getUserByEmail = (email) => API.get(`/api/users/${email}`);