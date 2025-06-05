import React, { useState, useEffect } from "react";
import "../styles/modal.css"; // Asegúrate de tener estilos apropiados

function UpdateLaboratory({ show, laboratorio, onSave, onCancel }) {
  const [editado, setEditado] = useState({
    id: "",
    nombre: "",
    direccion: "",
    telefono: ""
  });

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

  const handleSave = () => {
    if (
      editado.id.trim() &&
      editado.nombre.trim() &&
      editado.direccion.trim() &&
      editado.telefono.trim()
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
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={editado.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={editado.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={editado.direccion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={editado.telefono}
          onChange={handleChange}
        />
        <div className="modal-actions">
          <button className="btn-confirm" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateLaboratory;
