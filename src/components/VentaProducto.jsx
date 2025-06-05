import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/home.css";
import "../styles/vistaGeneral.css";

function VentaProducto() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([{ nombre: "", cantidad: "" }]);

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const goTo = (ruta) => {
    navigate(ruta);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const nuevosProductos = [...productos];
    nuevosProductos[index][name] = value;
    setProductos(nuevosProductos);
  };

  const agregarProducto = () => {
    setProductos([...productos, { nombre: "", cantidad: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let producto of productos) {
      if (!producto.nombre || !producto.cantidad) {
        alert("Completa todos los campos antes de vender.");
        return;
      }
    }
    console.log("Venta registrada:", productos);
    alert("Venta registrada exitosamente.");
    setProductos([{ nombre: "", cantidad: "" }]);
  };

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
          <input
            type="text"
            placeholder="Buscar..."
            className="search"
            value={busqueda}
            onChange={handleSearch}
          />
          <button className="logout" onClick={handleLogout}>
            🔓 LOGOUT
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
        <div className="productos-container">
          <h2>VENTA DE PRODUCTO</h2>
          <form className="venta-form" onSubmit={handleSubmit}>
            {productos.map((producto, index) => (
              <div key={index} className="producto-card">
                <input
                  type="text"
                  name="nombre"
                  placeholder="NOMBRE PRODUCTO"
                  value={producto.nombre}
                  onChange={(e) => handleChange(index, e)}
                  className="search-input"
                />
                <input
                  type="number"
                  name="cantidad"
                  placeholder="CANTIDAD VENDIDA"
                  value={producto.cantidad}
                  onChange={(e) => handleChange(index, e)}
                  className="search-input"
                />
              </div>
            ))}
            <div style={{ marginTop: "1rem" }}>
              <button
                type="button"
                className="btn-registrar"
                onClick={agregarProducto}
                style={{ marginRight: "1rem" }}
              >
                ➕ AGREGAR OTRO PRODUCTO
              </button>
              <button type="submit" className="btn-registrar">
                💰 VENDER
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default VentaProducto;

