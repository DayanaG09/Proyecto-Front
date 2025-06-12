import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalStock from "..//components/ModalStock"; 
import "../styles/Home.css";
import logo from "../assets/logo.png";
import HomeBanner from "./HomeBanner"; 
import { getLowStockProducts } from "../services/productService";

function Home() {
  const navigate = useNavigate();
  
  const [isLowStockModalOpen, setIsLowStockModalOpen] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]); // Usaremos esta lista para los children

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const goTo = (ruta) => {
    navigate(ruta);
  };

  

  const showLowStockProducts = () => {
    getLowStockProducts()
      .then((response) => {
        setLowStockProducts(response.data);
        setIsLowStockModalOpen(true);
      })
      .catch((error) => {
        console.error("Error al obtener productos con bajo stock", error);
      });
  };

  const closeLowStockModal = () => {
    setIsLowStockModalOpen(false);
    setLowStockProducts([]); 
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
          
          <button className="low-stock-button" onClick={showLowStockProducts}>
            ⚠️ Stock Bajo
          </button>
          <button className="logout" onClick={handleLogout}>
            🔓 Cerrar Sesion
          </button>
        </div>
      </header>

      <nav className="home-nav">
        <button onClick={() => goTo("/home")}>🏠 INICIO</button>
        <button onClick={() => goTo("/laboratorio")}>🧪LABORATORIO</button>
        <button onClick={() => goTo("/Productos")}>💊 PRODUCTOS</button>
        <button onClick={() => goTo("/proveedores")}>📦 PROVEEDORES</button>
        <button onClick={() => goTo("/ventaProducto")}>💰 VENTAS</button>
        <button onClick={() => goTo("/inventario")}>📦 INVENTARIO</button>
      </nav>

      <main className="home-main">
        <HomeBanner />
      </main>

     
      <ModalStock
        isOpen={isLowStockModalOpen}
        onClose={closeLowStockModal}
        children={lowStockProducts.length > 0 ? (
          <ul className="low-stock-list">
            {lowStockProducts.map(product => (
              <li key={product.id}>
                <strong>{product.name}</strong>: {product.stock} unidades
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos próximos a agotarse. ¡El inventario está en buen estado!</p>
        )}
        title="Productos Próximos a Agotarse"
      />
    </div>
  );
}

export default Home;