import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/resetPassword.css"; // Estilos personalizados
import { resetPassword } from "../services/passwordService"; // Función que llama a tu backend
import Toast from "./Toast";

function ResetPassword({ show, token, handleClose }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [mensajeToast, setMensajeToast] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const mostrarToast = (mensaje) => {
    setMensajeToast(mensaje);
    setMostrarMensaje(true);
  };

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
       mostrarToast("Las contraseñas no coinciden.");
      return;
    }

    try {
      await resetPassword(token, password);
       mostrarToast("Contraseña actualizada con éxito.");
      

      handleClose();               // Cierra el modal
      navigate("/login", { replace: true }); // Redirige y limpia la URL
    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
       mostrarToast("Error al actualizar la contraseña. Intenta nuevamente.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Restablecer contraseña</h2>
          <button onClick={handleClose} className="close-btn">×</button>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">Actualizar</button>
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

export default ResetPassword;
