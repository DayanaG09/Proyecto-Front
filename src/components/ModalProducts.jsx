
import React, { useState } from "react";
import "../styles/modalProducts.css"; // Estilos sugeridos abajo

function ModalProducts({ onClose, onRegistrar }) {
  const [producto, setProducto] = useState({
    nombre: "",
    cantidad: "",
    precio: "",
    lote: "",
    proveedor: "",
    laboratorio: "",
    vencimiento: "",
  });

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistrar(producto); // Le pasa el producto al padre
    onClose(); // Cierra el modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Registrar Producto</h2>
        <form onSubmit={handleSubmit} className="formulario">
          <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
          <input type="number" name="cantidad" placeholder="Cantidad" onChange={handleChange} />
          <input type="number" name="precio" placeholder="Precio" onChange={handleChange} />
          <input type="text" name="lote" placeholder="Lote" onChange={handleChange} />
          <input type="text" name="proveedor" placeholder="Proveedor" onChange={handleChange} />
          <input type="text" name="laboratorio" placeholder="Laboratorio" onChange={handleChange} />
          <input type="date" name="vencimiento" onChange={handleChange} />
          <div className="modal-buttons">
            <button type="submit">Registrar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalProducts;
