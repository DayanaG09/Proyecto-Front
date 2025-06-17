import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalProducts from "./ModalProducts";
import logo from "../assets/logo.png";
import "../styles/Home.css";
import medicamento from "../assets/medicamento.png";
import SearchBar from "./SearchBar";
import { getActiveProducts } from "../services/productService";
import Toast from "./Toast";

function Products() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    getActiveProducts()
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar productos", error);
      });
  }, []);

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const mostrarToast = (mensaje) => {
    setMensajeToast(mensaje);
    setMostrarMensaje(true);
  };

  const registrarProducto = () => {
    getActiveProducts()
      .then((response) => {
        setProductos(response.data);
        setMostrarModal(false);
        mostrarToast("Producto registrado exitosamente");
      })
      .catch(() => {
        mostrarToast("Error al recargar productos después del registro");
      });
  };

  const goTo = (ruta) => {
    navigate(ruta);
  };

  const productosFiltrados = productos.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

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
          <SearchBar valor={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar producto..." />
          <button className="logout" onClick={handleLogout}>
            🔓 Cerrar Sesión
          </button>
        </div>
      </header>

      <nav className="home-nav">
        <button onClick={() => goTo("/home")}>🏠 INICIO</button>
        <button onClick={() => goTo("/laboratorio")}>🧪 LABORATORIO</button>
        <button onClick={() => goTo("/Productos")}>💊 PRODUCTOS</button>
        <button onClick={() => goTo("/proveedores")}>📦 PROVEEDORES</button>
        <button onClick={() => goTo("/ventaProducto")}>💰 VENTAS</button>
        <button onClick={() => goTo("/inventario")}>📋 INVENTARIO</button>
      </nav>

      <main className="home-main">
        <div className="container">
          <h2>Productos</h2>
          <div className="productos-grid">
            {productosFiltrados.length === 0 ? (
              <p className="sin-resultados">No se encontraron productos</p>
            ) : (
              productosFiltrados.map((prod) => (
                <div key={prod.id} className="card-producto">
                  <img src={medicamento} alt={prod.name} className="card-img" />
                  <div className="card-info">
                    <h3>{prod.name}</h3>
                    <p>${prod.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <button className="btn-registrar" onClick={() => setMostrarModal(true)}>
            ➕ Registrar nuevo producto
          </button>
        </div>

        {mostrarModal && (
          <ModalProducts onClose={() => setMostrarModal(false)} onRegistrar={registrarProducto} />
        )}

        {mostrarMensaje && (
          <Toast mensaje={mensajeToast} onClose={() => setMostrarMensaje(false)} />
        )}
      </main>
    </div>
  );
}

export default Products;
