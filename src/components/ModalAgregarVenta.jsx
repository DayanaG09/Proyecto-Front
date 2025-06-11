import React, { useState } from "react";
import "../styles/modal.css"; // Asegúrate de tener este CSS creado

// Productos de prueba
const MOCK_PRODUCTOS = [
  { id: 1, nombre: "Paracetamol" },
  { id: 2, nombre: "Ibuprofeno" },
  { id: 3, nombre: "Amoxicilina" },
];

function ModalAgregarVenta({ onClose, setVentas }) {
  const [busqueda, setBusqueda] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const productosFiltrados = MOCK_PRODUCTOS.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarProducto = (producto) => {
    if (!productosSeleccionados.find((p) => p.id === producto.id)) {
      setProductosSeleccionados([
        ...productosSeleccionados,
        { ...producto, cantidad: "" },
      ]);
    }
  };

  const handleCantidadChange = (id, cantidad) => {
    setProductosSeleccionados((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad } : p
      )
    );
  };

  const registrarVenta = () => {
    // Validar que todas las cantidades estén completas y sean válidas
    const ventaValida = productosSeleccionados.every(
      (p) => p.cantidad !== "" && !isNaN(p.cantidad) && Number(p.cantidad) > 0
    );

    if (!ventaValida) {
      alert("Completa correctamente todas las cantidades.");
      return;
    }

    // Convertir cantidades a número
    const ventaFormateada = productosSeleccionados.map((p) => ({
      ...p,
      cantidad: parseInt(p.cantidad),
    }));

    // Guardar la venta
    setVentas((prev) => [...prev, ventaFormateada]);
    alert("Venta registrada exitosamente.");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Agregar Productos a la Venta</h3>

        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />

        <div className="lista-productos">
          {productosFiltrados.map((producto) => (
            <div
              key={producto.id}
              className="producto-item"
              onClick={() => agregarProducto(producto)}
            >
              {producto.nombre}
            </div>
          ))}
        </div>

        <h4>Productos Seleccionados</h4>
        {productosSeleccionados.length === 0 && (
          <p style={{ fontStyle: "italic", color: "gray" }}>
            No has seleccionado productos.
          </p>
        )}
        {productosSeleccionados.map((producto) => (
          <div key={producto.id} className="producto-seleccionado">
            <span>{producto.nombre}</span>
            <input
              type="number"
              placeholder="Cantidad"
              value={producto.cantidad}
              onChange={(e) =>
                handleCantidadChange(producto.id, e.target.value)
              }
              className="cantidad-input"
              min="1"
            />
          </div>
        ))}

        <div className="modal-actions">
          <button className="btn-registrar" onClick={registrarVenta}>
            💰 VENDER
          </button>
          <button className="btn-cancelar" onClick={onClose}>
            ❌ CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAgregarVenta;

