import React, { useState } from "react";
import "../styles/forgotPassword.css"; // Para los estilos del modal";
import { requestPasswordReset } from "../services/passwordService";

function ForgotPassword({ show, handleClose }) {
  const [email, setEmail] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await requestPasswordReset(email);
    alert("Si los datos existen, se enviará un correo con instrucciones.");
  } catch (error) {
    console.error("Error al enviar solicitud:", error);
    alert("Hubo un error. Intenta nuevamente.");
  }

  handleClose();
};

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Recuperar contraseña</h2>
          <button onClick={handleClose} className="close-btn">
            ×
          </button>
        </div>
        <p className="modal-text">
          Ingresa tu correo o número de documento para recuperar tu contraseña
        </p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
