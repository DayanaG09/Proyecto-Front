
import React, { useState } from "react";
import "../styles/modalProducts.css"; // Estilos sugeridos abajo

function ModalProducts({ onClose, onRegistrar }) {
  const [producto, setProducto] = useState({
    nombre: "",
    cantidad: "",
    precio: "",
    fechaIngreso: "",
    lote: "",
    proveedor: "",
    laboratorio: "",
    vencimiento: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    // Actualiza el estado del producto con el nombre del campo y su valor
    const isNumberField = name === "precio" || name === "cantidad";
    // Si es un campo numérico, convierte el valor a número
    setProducto({
      ...producto,
      [name]: isNumberField ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistrar(producto); 
    onClose(); 

  }



  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Registrar Producto</h2>
        <form onSubmit={handleSubmit} className="formulario">
          <input type="text" name="nombre"required placeholder="Nombre" onChange={handleChange} />
          <input type="number" name="cantidad"required placeholder="Cantidad" onChange={handleChange} />
          <input type="number" name="precio" required placeholder="Precio" step={0.01} onChange={handleChange} />
          <div className="modal-inputs"> 
            <h3>fecha de ingreso</h3>
          <input type= "date" name="fechaIngreso" required placeholder="Fecha de Ingreso" onChange={handleChange} />
          </div>
          <input type="text" name="lote" required placeholder="Lote" onChange={handleChange} />
          <input type="text" name="proveedor"required placeholder="Proveedor" onChange={handleChange} />
          <input type="text" name="laboratorio"required placeholder="Laboratorio" onChange={handleChange} />
          <div className="modal-inputs">
            <h3>fecha de vencimiento</h3>
          <input type="date" name="vencimiento" onChange={handleChange} />
          </div>
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
