import React, { useState, useEffect } from "react";
import "../styles/modalUpdate.css"; 

function UpdateSupplier({ show, proveedor, onSave, onCancel }) {
  const [editado, setEditado] = useState({
    id: "",
    nombre: "",
    direccion: "",
    telefono: "",
    email: ""
  });

  useEffect(() => {
    if (proveedor) {
      setEditado(proveedor);
    }
  }, [proveedor]);

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
      editado.telefono.trim()&&
      editado.email.trim()
    ){
      onSave(editado);
    } else {
      alert("Todos los campos son obligatorios.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Editar Proveedor</h2>
        <div className="modal-header">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={editado.id}
          onChange={handleChange}
        />
        </div>
        <div className="modal-header">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={editado.nombre}
          onChange={handleChange}
        />
        </div>
        <div className="modal-header">
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={editado.direccion}
          onChange={handleChange}
        />
        </div>
        <div className="modal-header">
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={editado.telefono}
          onChange={handleChange}
        />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={editado.email}
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

export default UpdateSupplier;