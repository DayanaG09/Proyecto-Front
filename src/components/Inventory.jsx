import React, { useState } from "react";
import "../styles/inventory.css";
import logo from "../assets/logo.png";
import { inventarioInicial } from "./InventoryLogic";
import ModalConfirmation from "./ModalConfirmation";
import UpdateProduct from "./UpdateProduct";
import  { useNavigate } from "react-router-dom";



function Inventory() {
    const navigate = useNavigate();
  const [productos, setProductos] = useState(inventarioInicial);

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  // Modal Eliminar
  const [modalVisible, setModalVisible] = useState(false);
  const [indexAEliminar, setIndexAEliminar] = useState(null);

  // Modal Editar
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [indexAEditar, setIndexAEditar] = useState(null);

  const eliminarProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);
  };

  const confirmar = () => {
    if (indexAEliminar !== null) {
      eliminarProducto(indexAEliminar);
      setIndexAEliminar(null);
      setModalVisible(false);
    }
  };

  const guardarProductoEditado = (productoActualizado) => {
    const nuevosProductos = [...productos];
    nuevosProductos[indexAEditar] = productoActualizado;
    setProductos(nuevosProductos);
    setModalEditarVisible(false);
    setProductoEditando(null);
    setIndexAEditar(null);
  };

  return (
    <div className="inventario-container">
      <aside className="sidebar">
  <nav className="sidebar-nav">
    <img src={logo} alt="Logo" className="logo" />
    <button onClick={() => navigate("/home")}>🏠 INICIO</button>
    <button onClick={() => navigate("/laboratorio")}>🧪 LABORATORIO</button>
    <button onClick={() => navigate("/proveedores")}>📦 PROVEEDORES</button>
    <button onClick={() => navigate("/Productos")}>💊 PRODUCTOS</button>
    <button onClick={() => navigate("/inventario")}>📋 INVENTARIO</button>
    <button onClick={() => navigate("/ventaProducto")}>💰 VENTAS</button>
  </nav>
</aside>

      <main className="main">
        <div className="header">
          <h1>INVENTARIO</h1>
          <div className="header-icons">
            <button>🏠</button>
            <button className="logout" onClick={handleLogout}>
            🔓 LOGOUT
          </button>
          </div>
        </div>

        <div className="tabla">
          <div className="tabla-header">
            <span>FECHA DE INGRESO</span>
            <span>NOMBRE PRODUCTO</span>
            <span>CANTIDAD</span>
            <span>PRECIO</span>
            <span>PROVEEDOR</span>
            <span>LAB</span>
            <span>LOT</span>
            <span>F.VENCIMIEN</span>
            <span>ACCIONES</span>
          </div>

          {productos.map((p, i) => (
            <div key={i} className="fila">
              <span>{p.fecha}</span>
              <span>{p.nombre}</span>
              <span>{p.cantidad}</span>
              <span>{p.precio}</span>
              <span>{p.proveedor}</span>
              <span>{p.lab}</span>
              <span>{p.lote}</span>
              <span>{p.vencimiento}</span>
              <span className="acciones">
                <button
                  onClick={() => {
                    setIndexAEditar(i);
                    setProductoEditando(p);
                    setModalEditarVisible(true);
                  }}
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    setIndexAEliminar(i);
                    setModalVisible(true);
                  }}
                >
                  🗑️
                </button>
              </span>
            </div>
          ))}
        </div>

        <button className="informe-btn">GENERAR INFORME</button>

        <ModalConfirmation
          show={modalVisible}
          message="¿Estás seguro de que deseas eliminar este producto?"
          onConfirm={confirmar}
          onCancel={() => setModalVisible(false)}
        />

        <UpdateProduct
          show={modalEditarVisible}
          producto={productoEditando}
          onSave={guardarProductoEditado}
          onCancel={() => setModalEditarVisible(false)}
        />
      </main>
    </div>
  );
}

export default Inventory;

