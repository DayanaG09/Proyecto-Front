import React, { useEffect, useState } from "react";
import "../styles/modal.css"; // crea o adapta este CSS
import { createSale, getAllSales } from "../services/saleService";
import { getAllProducts } from "../services/productService";

function ModalAgregarVenta( { onClose, onRegistrar } ) {
  const [busqueda, setBusqueda] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);


const [productos, setProductos] = useState([]);

useEffect(() => {
  getAllProducts()
    .then((res) => setProductos(res.data))
    .catch((err) => console.error("Error al cargar productos", err));
}, []);

  const productosFiltrados = productos.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
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
      prev.map((p) => (p.id === id ? { ...p, cantidad } : p))
    );
  };

const registrarVenta = () => {
  if (
    productosSeleccionados.some(
      (p) => p.cantidad === "" 
      || isNaN(p.cantidad) 
      || p.cantidad <= 0 
      ||parseInt(p.cantidad) > p.stock
    )
  ) {
    alert("Completa correctamente todas las cantidades.");
    return;
  }

  const payload = {
    saleDate: new Date().toISOString(), // Fecha actual
    detalles: productosSeleccionados.map((p) => ({
      productId: p.id,
      quantity: parseInt(p.cantidad),
    })),
  };

  console.log("Payload enviado:", JSON.stringify(payload, null, 2));

  createSale(payload)
    .then(() => {
      return getAllSales(); // Recarga las ventas
    })
    .then((response) => {
      onRegistrar(response.data); // Actualiza la lista de ventas
      console.log("Venta registrada exitosamente.");
      onClose(); // Cierra el modal
    })
    .catch((error) => {
      console.error("Error al registrar la venta:", error);
      alert("Error al registrar la venta.");
    });
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

              {producto.name}

            </div>
          ))}
        </div>

        <h4>Productos Seleccionados</h4>

        {productosSeleccionados.map((producto) => (
          <div key={producto.id} className="producto-seleccionado">
            <span>{producto.name}</span>

            <input
              type="number"
              placeholder="Cantidad"
              value={producto.cantidad}
              onChange={(e) =>
                handleCantidadChange(producto.id, e.target.value)
              }
              className="cantidad-input"

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

