import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLaboratory from "./ModalLaboratory";
import ModalConfirmation from "./ModalConfirmation";
import UpdateLaboratory from "./UpdateLaboratory"; // Asegúrate de tenerlo
import logo from "../assets/logo.png";
import "../styles/home.css";
import "../styles/vistaGeneral.css";

function Laboratory() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [laboratorios, setLaboratorios] = useState([
    { id: "LAB001", nombre: "Genfar", direccion: "Calle 123", telefono: "3214567890" },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [indexAEliminar, setIndexAEliminar] = useState(null);

  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [labEditando, setLabEditando] = useState(null);
  const [indexAEditar, setIndexAEditar] = useState(null);

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const eliminarLaboratorio = (index) => {
    const nuevos = [...laboratorios];
    nuevos.splice(index, 1);
    setLaboratorios(nuevos);
  };

  const confirmar = () => {
    if (indexAEliminar !== null) {
      eliminarLaboratorio(indexAEliminar);
      setIndexAEliminar(null);
      setModalVisible(false);
    }
  };

  const guardarLaboratorioEditado = (actualizado) => {
    const nuevos = [...laboratorios];
    nuevos[indexAEditar] = actualizado;
    setLaboratorios(nuevos);
    setModalEditarVisible(false);
    setLabEditando(null);
    setIndexAEditar(null);
  };

  const goTo = (ruta) => {
    navigate(ruta);
  };

  const registrarLaboratorio = (nuevo) => {
    setLaboratorios([...laboratorios, nuevo]);
  };

  const laboratoriosFiltrados = laboratorios.filter((l) =>
    l.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="left">
          <img src={logo} alt="Logo Haybet" className="logo" />
        </div>
        <div className="center">
          <h1>SISTEMA DE INVENTARIO<br />HAYBET SALUD</h1>
        </div>
        <div className="right">
          <input
            type="text"
            placeholder="Buscar..."
            className="search"
            value={busqueda}
            onChange={handleSearch}
          />
          <button className="logout" onClick={handleLogout}>🔓 LOGOUT</button>
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
          <h2>Lista de Laboratorios</h2>
          <div className="productos-grid">
            {laboratoriosFiltrados.map((lab, i) => (
              <div key={i} className="producto-card">
                <h3>{lab.nombre}</h3>
                <p>ID: {lab.id}</p>
                <p>Dirección: {lab.direccion}</p>
                <p>Teléfono: {lab.telefono}</p>
                <div className="acciones">
                  <button onClick={() => {
                    setIndexAEditar(i);
                    setLabEditando(lab);
                    setModalEditarVisible(true);
                  }}>
                    ✏️
                  </button>
                  <button onClick={() => {
                    setIndexAEliminar(i);
                    setModalVisible(true);
                  }}>
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-registrar" onClick={() => setMostrarModal(true)}>
            ➕ Registrar nuevo laboratorio
          </button>
        </div>

        {mostrarModal && (
          <ModalLaboratory
            onClose={() => setMostrarModal(false)}
            onRegistrar={registrarLaboratorio}
          />
        )}

        <ModalConfirmation
          show={modalVisible}
          message="¿Estás seguro de que deseas eliminar este laboratorio?"
          onConfirm={confirmar}
          onCancel={() => setModalVisible(false)}
        />

        <UpdateLaboratory
          show={modalEditarVisible}
          laboratorio={labEditando}
          onSave={guardarLaboratorioEditado}
          onCancel={() => setModalEditarVisible(false)}
        />
      </main>
    </div>
  );
}

export default Laboratory;

