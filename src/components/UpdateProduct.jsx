import React, { useState, useEffect } from "react";
import "../styles/modalUpdate.css"; // Asegúrate de tener este archivo CSS para estilos

function UpdateProduct({ show, producto, onSave, onCancel, laboratorios, proveedores }) {
  const [editado, setEditado] = useState({});

  useEffect(() => {
    if (producto) {
      setEditado(producto);
    }}
  , [producto]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditado((editadoPrevido) => ({
      ...editadoPrevido,
      [name]: name === "laboratoryId" || name === "supplierId" ? parseInt(value) : value,
    }))
  }

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
            name="name"
            value={editado.name || ""}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            type="number"
            name="stock"
            value={editado.stock || ""}
            onChange={handleChange}
            placeholder="Cantidad"
          />
          <input
            type="text"
            name="price"
            value={editado.price || ""}
            onChange={handleChange}
            placeholder="Precio"
          />
          <label className="checkbox-label">

            <span>Fecha ingreso</span>
          </label>
          <input
            type="date"
            name="issueDate"
            value={editado.issueDate || ""}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]} // no permite fecha futura
          />
          <select name="supplierId" value={editado.supplierId || ""} onChange={handleChange}>
            <option value="">Seleccione proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>{prov.name}</option>
            ))}
          </select>
          <select name="laboratoryId" value={editado.laboratoryId || ""} onChange={handleChange}>
            <option value="">Seleccione laboratorio</option>
            {laboratorios.map((lab) => (
              <option key={lab.id} value={lab.id}>{lab.name}</option>
            ))}
          </select>
          <input
            type="text"
            name="batch"
            value={editado.batch || ""}
            onChange={handleChange}
            placeholder="Lote"
          />
          <label className="checkbox-label">

            <span>Fecha vencimiento</span>

          </label>
          <input
            type="date"
            name="expirationDate"
            value={editado.expirationDate || ""}
            onChange={handleChange}
            min={editado.issueDate || ""} // no permite fecha anterior a ingreso
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
