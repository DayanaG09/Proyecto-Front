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

function Supplier() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [modalRegistrarVisible, setModalRegistrarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);

  useEffect(() => {
    getAllSupplier().then((response) => {
      setProveedores(response.data);
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

  const [idAEliminar, setIdAEliminar] = useState(null);
  const [indexAEditar, setIndexAEditar] = useState(null);
  const [proveedorEditando, setProveedorEditando] = useState(null);

const registrarProveedor = () => {
  // En lugar de solo agregarlo al estado local, recargamos desde el backend
  getAllSupplier()
    .then((response) => {
      setProveedores(response.data);
      setModalRegistrarVisible(false);
      mostrarToast("Proveedor registrado exitosamente");
    })
    .catch(() => {
      mostrarToast("Error al recargar proveedores después del registro");
    });
};

  const guardarProveedorEditado = (actualizado) => {
    const nuevos = [...proveedores];
    nuevos[indexAEditar] = actualizado;
    setProveedores(nuevos);
    setModalEditarVisible(false);
    setProveedorEditando(null);
    setIndexAEditar(null);
    mostrarToast("Proveedor editado correctamente");
  };


 const confirmarEliminar = () => {
  if (idAEliminar !== null) {
    deleteSupplier(idAEliminar)
      .then(() => {
        return getAllSupplier(); // vuelve a consultar la lista actualizada
      })
      .then((response) => {
        setProveedores(response.data);
        mostrarToast("Proveedor eliminado exitosamente");
      })
      .catch((error) => {
        console.error("Error al eliminar proveedor:", error);
        mostrarToast("Error al eliminar proveedor.");
      })
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
        
          <img src={logo} alt="Logo Haybet" className="logo" />
        
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
          <input
            type="text"
            placeholder="Buscar..."
            className="search"
            value={busqueda}
            onChange={handleSearch}
          />
          
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
          <h2>Agenda de Proveedores</h2>
          <div className="productos-grid">

            {proveedoresFiltrados.length === 0 ? (
              <p className="sin-resultados">No se encontraron proveedores.</p>
            ) : (
              proveedoresFiltrados.map((prov) => {
                const indexOriginal = proveedores.findIndex(
                  (p) => p.id === prov.id
                );

                return (
                  <div key={prov.id} className="producto-card">
                    <h3>{prov.name}</h3>
                    <p>Dirección: {prov.address}</p>
                    <p>Correo: {prov.email}</p>
                    <p>Teléfono: {prov.phoneNumber}</p>
                    <div className="acciones">
                      <button
                        onClick={() => {
                          setIndexAEditar(indexOriginal);
                          setProveedorEditando(prov);
                          setModalEditarVisible(true);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => {
                          setIdAEliminar(prov.id); // ahora usamos id en lugar de índice
                          setModalEliminarVisible(true);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })
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
