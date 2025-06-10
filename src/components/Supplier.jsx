import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalSupplier from "./ModalSupplier";
import logo from "../assets/logo.png";
import "../styles/home.css"; 
import UpdateSupplier from "./UpdateSupplier";
import ModalConfirmation from "./ModalConfirmation";
import "../styles/vistaGeneral.css";

function Supplier() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [Proveedores, setProveedores] = useState([
    { id: "LAB001", nombre: "Genfar", direccion: "Calle 123", telefono: "3214567890", email: "dayaya@gmail.com"},
  ]);
  const [mostrarModal, setMostrarModal] = useState(false);

   const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [proEditando, setProEditando] = useState(null);
    const [indexAEditar, setIndexAEditar] = useState(null);

      const [modalVisible, setModalVisible] = useState(false);
      const [indexAEliminar, setIndexAEliminar] = useState(null);

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

  const registrarProveedor = (nuevo) => {
    setProveedores([...Proveedores, nuevo]);
  };

  const eliminarLaboratorio = (index) => {
    const nuevos = [...Proveedores];
    nuevos.splice(index, 1);
    setProveedores(nuevos);
  };

  const confirmar = () => {
    if (indexAEliminar !== null) {
      eliminarLaboratorio(indexAEliminar);
      setIndexAEliminar(null);
      setModalVisible(false);
    }
  };

  const guardarProveedorEditado = (actualizado) => {
    const nuevos = [...Proveedores];
    nuevos[indexAEditar] = actualizado;
    setProEditando(nuevos);
    setModalEditarVisible(false);
    setProEditando(null);
    setIndexAEditar(null);
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
            🔓 Cerrar Sesion
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
          <h2>Lista de Proveedores</h2>
          <div className="productos-grid">
            {Proveedores.map((pro, index) => (
              <div key={index} className="producto-card">
                <h3>{pro.nombre}</h3>
                <p>Dirección: {pro.direccion}</p>
                <p>Teléfono: {pro.telefono}</p>
                <p>Email: {pro.email}</p>
                <div className="acciones">
                  <button onClick={() => {
                    setIndexAEditar(index);
                    setProEditando(pro);
                    setModalEditarVisible(true);
                  }}>
                    ✏️
                  </button>
                  <button onClick={() => {
                    setIndexAEliminar(index);
                    setModalVisible(true);
                  }}>
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-registrar" onClick={() => setMostrarModal(true)}>
            ➕ Registrar nuevo Proveedor
          </button>
        </div>

        {mostrarModal && (
          <ModalSupplier
            onClose={() => setMostrarModal(false)}
            onRegistrar={registrarProveedor}
          />
        )}
        <UpdateSupplier
          show={modalEditarVisible}
          proveedor={proEditando}
          onSave={guardarProveedorEditado}
          onCancel={() => setModalEditarVisible(false)}
        />

        <ModalConfirmation
          show={modalVisible}
          message="¿Estás seguro de que deseas eliminar este Proveedor?"
          onConfirm={confirmar}
          onCancel={() => setModalVisible(false)}
        />
      </main>
    </div>
  );
}
export default Supplier;