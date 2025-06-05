import "../styles/Home.css";
import logo from "../assets/logo.png";
import farmacia from "../assets/Farmacia.jpg"; // Usa tu imagen real aquí
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado

function Home() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  const handleLogout = () => {
    // Aquí podrías limpiar localStorage, auth, etc.
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const handleSearch = (e) => {
    setBusqueda(e.target.busqueda.value);
    // Lógica de búsqueda (puedes implementar filtros en otro componente)
    console.log("Buscando:", e.target.busqueda.value);
  };

  const goTo = (ruta) => {
    navigate(ruta);
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
        <img src={farmacia} alt="Farmacia" className="main-image" />
      </main>
    </div>
  );
}

export default Home;
