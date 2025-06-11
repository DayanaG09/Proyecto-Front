import api from "./api";

export const loginUser = (credentials) => {
  return api.post("/user/login", credentials);
};
