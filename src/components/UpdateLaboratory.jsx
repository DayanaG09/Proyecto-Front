import React, { useState, useEffect } from "react";
import "../styles/modal.css";

function UpdateLaboratory({ show, laboratorio, onSave, onCancel }) {
  const [editado, setEditado] = useState({});

  useEffect(() => {
    if (laboratorio) {
      setEditado(laboratorio);
    }
  }, [laboratorio]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditado({ ...editado, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      editado.name?.trim() &&
      editado.address?.trim() &&
      editado.phoneNumber?.trim()
    ) {
      onSave(editado);
    } else {
      alert("Todos los campos son obligatorios.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Editar Laboratorio</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={editado.name || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={editado.address || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Teléfono"
            value={editado.phoneNumber || ""}
            onChange={handleChange}
          />
          <div className="modal-actions">
            <button className="btn-confirm" type="submit">
              Guardar
            </button>
            <button className="btn-cancel" type="button" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateLaboratory;