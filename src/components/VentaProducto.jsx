import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ModalAgregarVenta from "./ModalAgregarVenta";
import "../styles/Home.css";

function VentaProducto() {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const goTo = (ruta) => {
    navigate(ruta);
  };

  const [ventas, setVentas] = useState([]);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="left">
          <img src={logo} alt="Logo Haybet" className="logo" />
        </div>
        <div className="center">
          <h1>
            SISTEMA DE INVENTARIO
            <br />
            HAYBET SALUD
          </h1>
        </div>
        <div className="right">
          <button className="logout" onClick={handleLogout}>
            🔓 Cerrar Sesion
          </button>
        </div>
      </header>

      <nav className="home-nav">
        <button onClick={() => goTo("/home")}>🏠 INICIO</button>
        <button onClick={() => goTo("/laboratorio")}>🧪 LABORATORIO</button>
        <button onClick={() => goTo("/Productos")}>💊 PRODUCTOS</button>
        <button onClick={() => goTo("/proveedores")}>📦 PROVEEDORES</button>
        <button onClick={() => goTo("/VentaProducto")}>💰 VENTAS</button>
        <button onClick={() => goTo("/inventario")}>📦 INVENTARIO</button>
      </nav>

      <main className="home-main">
          <button
            className="home-button"
            onClick={() => setModalVisible(true)}
          >
            ➕ AGREGAR VENTA
          </button>
        {ventas.length > 0 && (
  <div className="ventas-card">
    <h3>Ventas Realizadas</h3>
    {ventas.map((venta, index) => (
      <div key={index} className="venta">
        <strong>Venta #{index + 1}</strong>
        <ul>
          {venta.map((producto, i) => (
            <li key={i}>
              {producto.nombre} - Cantidad: {producto.cantidad}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)}
      </main>

      {modalVisible && (
  <ModalAgregarVenta
    onClose={() => setModalVisible(false)}
    setVentas={setVentas}
  />
)}
    </div>
  );
}

export default VentaProducto;


