import React, { useState } from "react";
import "../styles/RegisterUser.css"; // Para los estilos del modal

function RegisterUser({ show, handleClose }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    tipoDocumento: "",
    correo: "",
    celular: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del usuario:", form);
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>REGISTRO DE USUARIO</h2>
          <button onClick={handleClose} className="close-btn">
            ×
          </button>
        </div>
        <p className="modal-text">
          Rellene el formulario y la contraseña para iniciar sesión
        </p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <input
              type="text"
              placeholder="NOMBRE"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="APELLIDO"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="N° DOCUMENTO"
              name="documento"
              value={form.documento}
              onChange={handleChange}
              required
            />
            <select
              name="tipoDocumento"
              value={form.tipoDocumento}
              onChange={handleChange}
              required
            >
              <option value="">Tipo de documento</option>
              <option value="cedula ">Cedula Ciudadaia</option>
              <option value="tarjeta de identidad">tarjeta de Identidad</option>
              <option value="PPT">PPT</option>
            </select>
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="CORREO ELECTRÓNICO"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="CELULAR"
              name="celular"
              value={form.celular}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="password"
            placeholder="CONTRASEÑA"
            name="contrasena"
            value={form.contrasena}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;