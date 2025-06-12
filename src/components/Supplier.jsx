import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalSupplier from "./ModalSupplier";
import logo from "../assets/logo.png";
import "../styles/home.css";
import "../styles/vistaGeneral.css";
import { deleteSupplier, getAllSupplier } from "../services/supplierService";
import Toast from "./Toast";
import UpdateSupplier from "./UpdateProveedor";
import ModalConfirmation from "./ModalConfirmation";
import SearchBar from "./SearchBar"; // <-- Nuevo componente

function Supplier() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [modalRegistrarVisible, setModalRegistrarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [mensajeToast, setMensajeToast] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [proveedorEditando, setProveedorEditando] = useState(null);

  useEffect(() => {
    getAllSupplier()
      .then((response) => setProveedores(response.data))
      .catch(() => mostrarToast("Error al cargar proveedores."));
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const goTo = (ruta) => {
    navigate(ruta);
  };

  const mostrarToast = (mensaje) => {
    setMensajeToast(mensaje);
    setMostrarMensaje(true);
  };

  const registrarProveedor = () => {
    getAllSupplier()
      .then((response) => {
        setProveedores(response.data);
        setModalRegistrarVisible(false);
        mostrarToast("Proveedor registrado exitosamente");
      })
      .catch(() => mostrarToast("Error al recargar proveedores."));
  };

  const guardarProveedorEditado = (actualizado) => {
    const nuevos = proveedores.map((p) =>
      p.id === actualizado.id ? actualizado : p
    );
    setProveedores(nuevos);
    setModalEditarVisible(false);
    setProveedorEditando(null);
    mostrarToast("Proveedor editado correctamente");
  };

  const confirmarEliminar = () => {
    if (idAEliminar !== null) {
      deleteSupplier(idAEliminar)
        .then(() => getAllSupplier())
        .then((response) => {
          setProveedores(response.data);
          mostrarToast("Proveedor eliminado exitosamente");
        })
        .catch(() => mostrarToast("Error al eliminar proveedor."))
        .finally(() => {
          setIdAEliminar(null);
          setModalEliminarVisible(false);
        });
    }
  };

  const proveedoresFiltrados = proveedores.filter((p) =>
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
          <SearchBar
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar proveedor..."
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
        <div>
          <h2>Agenda de Proveedores</h2>
          <div className="productos-grid">
            {proveedoresFiltrados.length === 0 ? (
              <p className="sin-resultados">No se encontraron proveedores.</p>
            ) : (
              proveedoresFiltrados.map((prov) => (
                <div key={prov.id} className="producto-card">
                  <h3>{prov.name}</h3>
                  <p>Dirección: {prov.address}</p>
                  <p>Correo: {prov.email}</p>
                  <p>Teléfono: {prov.phoneNumber}</p>
                  <div className="acciones">
                    <button
                      onClick={() => {
                        setProveedorEditando(prov);
                        setModalEditarVisible(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        setIdAEliminar(prov.id);
                        setModalEliminarVisible(true);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            className="btn-registrar"
            onClick={() => setModalRegistrarVisible(true)}
          >
            ➕ Registrar nuevo Proveedor
          </button>
        </div>

        {modalRegistrarVisible && (
          <ModalSupplier
            onClose={() => setModalRegistrarVisible(false)}
            onRegistrar={registrarProveedor}
          />
        )}

        <UpdateSupplier
          show={modalEditarVisible}
          proveedor={proveedorEditando}
          onSave={guardarProveedorEditado}
          onCancel={() => setModalEditarVisible(false)}
        />

        <ModalConfirmation
          show={modalEliminarVisible}
          message="¿Estás seguro de que deseas eliminar este proveedor?"
          onConfirm={confirmarEliminar}
          onCancel={() => setModalEliminarVisible(false)}
        />

        {mostrarMensaje && (
          <Toast
            mensaje={mensajeToast}
            onClose={() => setMostrarMensaje(false)}
          />
        )}
      </main>
    </div>
  );
}

export default Supplier;