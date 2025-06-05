import React, { useState } from "react";
import "../styles/forgotPassword.css"; // Para los estilos del modal";

function ForgotPassword({ show, handleClose }) {
  const [emailOrDoc, setEmailOrDoc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recuperación para:", emailOrDoc);
    alert("Si los datos existen, se enviará un correo o mensaje.");
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
            type="text"
            placeholder="Correo o N° Documento"
            value={emailOrDoc}
            onChange={(e) => setEmailOrDoc(e.target.value)}
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
