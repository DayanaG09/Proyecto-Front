import api from "./api";

// Solicitar envío del token al correo
export const requestPasswordReset = (email) => {
  return api.post("/password/request-reset", { email });
};

// Cambiar la contraseña usando el token
export const resetPassword = (token,password) => {
  // data debe tener { token, password }
  return api.post("/password/reset", {
    token,
    password,
  },{headers: {
      "Content-Type" : "application/json",
  }});
};
