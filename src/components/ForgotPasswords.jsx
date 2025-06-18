import React, { useState } from "react";
import "../styles/forgotPassword.css"; // Para los estilos del modal";
import { requestPasswordReset } from "../services/passwordService";
import Toast from "./Toast";

function ForgotPassword({ show, handleClose }) {
  const [email, setEmail] = useState("");

  const [mensajeToast, setMensajeToast] = useState("");
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
  
    const mostrarToast = (mensaje) => {
      setMensajeToast(mensaje);
      setMostrarMensaje(true);
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await requestPasswordReset(email);
     mostrarToast("se enviará un correo con instrucciones.");
  } catch (error) {
    console.error("Error al enviar solicitud:", error);
     mostrarToast("Hubo un error. Intenta nuevamente.");
  }

  handleClose();
};

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="titulo">
          
          <div><h2>Recuperar contraseña</h2></div>
          
          <button onClick={handleClose} className="close-btn">
            ×
          </button>
        </div>
        <p className="modal-text">
          Ingresa tu correo  para recuperar tu contraseña
        </p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit">
            Enviar solicitud
          </button>
        </form>
      </div>
      {mostrarMensaje && (
          <Toast
            mensaje={mensajeToast}
            onClose={() => setMostrarMensaje(false)}
          />
        )}
    </div>
  );
}

export default ForgotPassword;
