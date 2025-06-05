import React, { useState, useEffect } from "react";
import "../styles/modalUpdate.css"; // Asegúrate de tener este archivo CSS para estilos

function UpdateProduct({ show, producto, onSave, onCancel }) {
  const [editado, setEditado] = useState({});

  useEffect(() => {
    if (producto) {
      setEditado(producto);
    }
  }, [producto]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditado({ ...editado, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editado);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit} className="form-editar">
          <input
            type="text"
            name="nombre"
            value={editado.nombre || ""}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            type="number"
            name="cantidad"
            value={editado.cantidad || ""}
            onChange={handleChange}
            placeholder="Cantidad"
          />
          <input
            type="text"
            name="precio"
            value={editado.precio || ""}
            onChange={handleChange}
            placeholder="Precio"
          />
          <input
            type="text"
            name="proveedor"
            value={editado.proveedor || ""}
            onChange={handleChange}
            placeholder="Proveedor"
          />
          <input
            type="text"
            name="lab"
            value={editado.lab || ""}
            onChange={handleChange}
            placeholder="Laboratorio"
          />
          <input
            type="text"
            name="lote"
            value={editado.lote || ""}
            onChange={handleChange}
            placeholder="Lote"
          />
          <input
            type="date"
            name="vencimiento"
            value={editado.vencimiento || ""}
            onChange={handleChange}
          />

          <div className="editar-acciones">
            <button type="submit" className="btn-confirm">
              Guardar
            </button>
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
