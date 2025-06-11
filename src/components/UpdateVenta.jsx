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
    updated.detalles[index].quantity = Number(newQuantity);
    setFormData(updated);
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  if (!show || !venta) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Editar Venta {venta.id}</h2>
        <ul>
          {formData.detalles.map((detalle, index) => (
            <li key={detalle.productId}>
              {detalle.productName} - 
              <input
                type="number"
                min="1"
                value={detalle.quantity}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </li>
          ))}
        </ul>
        <button onClick={handleSubmit}>Guardar Cambios</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default UpdateVenta;