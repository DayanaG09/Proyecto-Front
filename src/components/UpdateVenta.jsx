import React, { useEffect, useState } from 'react';
import "../styles/modalUpdate.css";

function UpdateVenta({ show, venta, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    ...venta,
    detalles: venta?.detalles || []
  });

  useEffect(() => {
    if (venta) {
      setFormData({
        ...venta,
        detalles: venta.detalles || []
      });
    }
  }, [venta]);

  const handleChange = (index, newQuantity) => {
    const updated = { ...formData };
    updated.detalles[index].quantity = newQuantity === "" ? "" : Number(newQuantity);
    setFormData(updated);
  };

  const handleSubmit = () => {
    if (ventaInvalida) {
      alert("Todas las cantidades deben ser mayores o iguales a 1.");
      return;
    }
    onSave(formData);
  };

  const ventaInvalida = formData.detalles.some(
  (detalle) =>
    detalle.quantity === "" ||
    isNaN(detalle.quantity) ||
    Number(detalle.quantity) < 1 ||
    (detalle.stock !== undefined && Number(detalle.quantity) > detalle.stock)
);

  if (!show || !venta) return null;

  return (
    <div className="modal">
      <div className="modal-content modal-content-update">
        <h2>Editar Venta {venta.id}</h2>
        <ul>
          {formData.detalles.map((detalle, index) => (
            <li key={detalle.productId}>
              {detalle.productName} (Stock: {detalle.stock}) -
                <input
                  type="number"
                  min="1"
                  max={detalle.stock}
                  value={detalle.quantity === "" ? "" : detalle.quantity}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
            </li>
          ))}
        </ul>
        <button className="btn-confirm" onClick={handleSubmit}>Guardar Cambios</button>
        <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default UpdateVenta;