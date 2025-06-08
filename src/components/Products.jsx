import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalProducts from "./ModalProducts";
import logo from "../assets/logo.png";
import "../styles/home.css";
import "../styles/vistaGeneral.css";
import SearchBar from "./SearchBar";
import { getAllProducts } from "../services/productService";
import Toast from "./Toast";

function Products() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
  getAllProducts()
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

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const goTo = (ruta) => {
    navigate(ruta);
  };

  const [mensajeToast, setMensajeToast] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const mostrarToast = (mensaje) => {
      setMensajeToast(mensaje);
      setMostrarMensaje(true);
    };

  const registrarProducto = async (nuevo) => {
    try{
      const res = await getAllProducts();
      setProductos(res.data);
      setMostrarModal(false);
      mostrarToast("Producto registrado exitosamente")
    } 
    catch(error){
      console.error("Error al eliminar producto: ", error);
      mostrarToast("Error al eliminar producto");
    };
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
        <button onClick={() => goTo("/ventaProducto")}>💰 VENTAS</button>
        <button onClick={() => goTo("/inventario")}>📦 INVENTARIO</button>
      </nav>

      <main className="home-main">
        <div className="productos-container">
          <h2>Lista de Productos</h2>
          <div className="productos-grid">
            {productos.map((prod, index) => (
              <div key={index} className="producto-card">
                <h3>{prod.name}</h3>
                <p>${prod.price}</p>
              </div>
            ))}
          </div>
          <button className="btn-registrar" onClick={() => setMostrarModal(true)}>
            ➕ Registrar nuevo producto
          </button>
        </div>

        {mostrarModal && (
          <ModalProducts
            onClose={() => setMostrarModal(false)}
            onRegistrar={registrarProducto}
          />
        )}

        {mostrarMensaje && (
          <Toast
            mensaje={mensajeToast}
            onClose= {() => setMostrarMensaje(false)}
          />
        )
        }
      </main>
    </div>
  );
}

export default Products;
