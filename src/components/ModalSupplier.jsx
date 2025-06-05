import React, { useState } from "react";
import "../styles/modal.css";
function ModalSupplier({ onClose, onRegistrar }) {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistrar(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Registrar Laboratorio</h3>
        <form onSubmit={handleSubmit} className="formulario">
          <label>ID</label>
          <input type="text" name="id" onChange={handleChange} required />

          <label>Nombre</label>
          <input type="text" name="nombre" onChange={handleChange} required />

          <label>Dirección</label>
          <input type="text" name="direccion" onChange={handleChange} required />

          <label>Teléfono</label>
          <input type="tel" name="telefono" onChange={handleChange} required />
          
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />

          <div className="modal-buttons">
            <button type="submit" className="btn-registrar">Registrar</button>
            <button type="button" className="btn-cerrar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalSupplier;
