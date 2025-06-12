import React, { useState } from "react";
import "../styles/modal.css";
import { createSupplier } from "../services/supplierService";
function ModalSupplier({ onClose, onRegistrar }) {
  const [proveedor, setProveedor] = useState({});

  const handleChange = (e) => {
    const {name , value } = e.target;
    // Validación para asegurarse de que los campos numéricos solo acepten números
    if (name === "phoneNumber") {
      const regex = /^\d*$/; // Permite solo números
      if (!regex.test(value)) {
        return; // No actualiza el estado si el valor no es válido
      }
    }
    setProveedor({
      ...proveedor,
      [name] : value,
    })
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await createSupplier(proveedor);
        onRegistrar(response.data);
      } catch (error) {
        console.error("Error al crear proveedor:", error);
  }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Registrar Proveedor</h3>
        <form onSubmit={handleSubmit} className="formulario">

          <label>Nombre</label>
          <input type="text" name="name" value={proveedor.name || ""} onChange={handleChange} className="modal-inputs" required />

          <label>Dirección</label>
          <input type="text" name="address" value={proveedor.address || ""} onChange={handleChange} className="modal-inputs"  required />

          <label>Email</label>
          <input type="email" name="email" value={proveedor.email || ""} onChange={handleChange} className="modal-inputs" required />

          <label>Teléfono</label>
          <input type="tel" name="phoneNumber" value={proveedor.phoneNumber || ""} onChange={handleChange} className="modal-inputs"  required />


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
