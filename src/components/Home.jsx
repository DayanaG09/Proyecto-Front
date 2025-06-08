import "../styles/Home.css";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeBanner from "./HomeBanner";


function Home() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  const handleLogout = () => {
    
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const goTo = (ruta) => {
    navigate(ruta);
  };

  const handleSearch = (e) => {
  const valor = e.target.value;
  setBusqueda(valor);
  if (valor.length > 2) {
    navigate(`/productos?buscar=${encodeURIComponent(valor)}`);
  }
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
        <button onClick={() => goTo("/laboratorio")}>🧪LABORATORIO</button>
        <button onClick={() => goTo("/Productos")}>💊 PRODUCTOS</button>
        <button onClick={() => goTo("/proveedores")}>📦 PROVEEDORES</button>
        <button onClick={() => goTo("/ventaProducto")}>💰 VENTAS</button>
        <button onClick={() => goTo("/inventario")}>📦 INVENTARIO</button>
      </nav>

      <main className="home-main"> 
        <HomeBanner />
      </main>
    </div>
  );
}

export default Home;
