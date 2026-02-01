import API from "./api";

export const addBasicUser = (data) => API.post("/api/users/basic", data);
export const updateUserByEmail = (data) => API.post("/api/users/update", data);
export const getUserProfile = () => API.get("/api/users/profile");