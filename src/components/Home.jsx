import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalStock from "..//components/ModalStock"; 
import "../styles/Home.css";
import logo from "../assets/logo.png";
import HomeBanner from "./HomeBanner"; 

function Home() {
  const navigate = useNavigate();
  
  const [isLowStockModalOpen, setIsLowStockModalOpen] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]); // Usaremos esta lista para los children
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts([]); // Carga simulada de todos los productos
  }, []);

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const goTo = (ruta) => {
    navigate(ruta);
  };

  

  const showLowStockProducts = () => {
    const minStock = 10;
    const filtered = allProducts.filter(product => product.stock <= minStock);
    setLowStockProducts(filtered); 
    setIsLowStockModalOpen(true);
  };

  const closeLowStockModal = () => {
    setIsLowStockModalOpen(false);
    setLowStockProducts([]); 
  };

  return (
    <div className="home-container">
    
      <header className="home-header">
         <img src={logo} alt="Logo Haybet" className="logo"/>
        
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
          <button className="low-stock-button" onClick={showLowStockProducts}>
            ⚠️ Stock Bajo
          </button>
          
        </div>
      </header>

      <nav className="home-nav">
        <button onClick={() => goTo("/home")}>🏠 INICIO</button>
        <button onClick={() => goTo("/laboratorio")}>🧪LABORATORIO</button>
        <button onClick={() => goTo("/Productos")}>💊 PRODUCTOS</button>
        <button onClick={() => goTo("/proveedores")}>📦 PROVEEDORES</button>
        <button onClick={() => goTo("/ventaProducto")}>💰 VENTAS</button>
        <button onClick={() => goTo("/inventario")}>📋 INVENTARIO</button>
      </nav>

      <main className="main-home">
        <div className="banner-img">
        <HomeBanner />
        </div>
        
      </main>
      
        
      
      <ModalStock
        isOpen={isLowStockModalOpen}
        onClose={closeLowStockModal}
        title="Productos Próximos a Agotarse"
      >
        
        {lowStockProducts.length > 0 ? (
          <ul className="low-stock-list">
            {lowStockProducts.map(product => (
              <li key={product.id}>
                **{product.name}**: {product.stock} unidades
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos próximos a agotarse. ¡El inventario está en buen estado!</p>
        )}
      </ModalStock>
    </div>
  );
}

export default Home;