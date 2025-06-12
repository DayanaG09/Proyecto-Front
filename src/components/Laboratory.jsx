import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalLaboratory from "./ModalLaboratory";
import ModalConfirmation from "./ModalConfirmation";
import UpdateLaboratory from "./UpdateLaboratory";
import logo from "../assets/logo.png";
import "../styles/home.css";
import "../styles/vistaGeneral.css";
import { deleteLaboratory, getAllLaboratory, updateLaboratory } from "../services/laboratoryService";
import Toast from "./Toast";
import SearchBar from "./SearchBar";

function Laboratory() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [laboratorios, setLaboratorios] = useState([]);
  const [modalRegistrarVisible, setModalRegistrarVisible] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [indexAEditar, setIndexAEditar] = useState(null);
  const [labEditando, setLabEditando] = useState(null);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [mensajeToast, setMensajeToast] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    getAllLaboratory()
      .then((response) => setLaboratorios(response.data))
      .catch((error) => console.log("Error al cargar laboratorios: ", error));
  }, []);

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  const mostrarToast = (mensaje) => {
    setMensajeToast(mensaje);
    setMostrarMensaje(true);
  };

  const confirmarEliminar = () => {
    if (idAEliminar !== null) {
      deleteLaboratory(idAEliminar)
        .then(() => getAllLaboratory())
        .then((response) => {
          setLaboratorios(response.data);
          mostrarToast("Laboratorio eliminado exitosamente");
        })
        .catch((error) => {
          console.error("Error al eliminar laboratorio:", error);
          mostrarToast("Error al eliminar laboratorio.");
        })
        .finally(() => {
          setIdAEliminar(null);
          setModalEliminarVisible(false);
        });
    }
  };

  const guardarLaboratorioEditado = (actualizado) => {
    updateLaboratory(actualizado.id, actualizado).then(() => {
      const nuevos = [...laboratorios];
      nuevos[indexAEditar] = actualizado;
      setLaboratorios(nuevos);
      setModalEditarVisible(false);
      setLabEditando(null);
      mostrarToast("Laboratorio editado exitosamente!");
    });
  };

  const registrarLaboratorio = () => {
    getAllLaboratory()
      .then((response) => {
        setLaboratorios(response.data);
        setModalRegistrarVisible(false);
        mostrarToast("Laboratorio registrado exitosamente");
      })
      .catch(() => {
        mostrarToast("Error al recargar laboratorios después del registro");
      });
  };

  const goTo = (ruta) => {
    navigate(ruta);
  };

  const laboratoriosFiltrados = laboratorios.filter((l) =>
    l.name.toLowerCase().includes(busqueda.toLowerCase())
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
          <SearchBar valor={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar laboratorio..."/>
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
        <button onClick={() => goTo("/inventario")}>📦 INVENTARIO</button>
      </nav>

      <main className="home-main">
        <div>
          <h2>Lista de Laboratorios</h2>
          <div className="productos-grid">
            {laboratoriosFiltrados.length === 0 ? (
              <p className="sin-resultados">No se encontraron laboratorios.</p>
            ) : (
              laboratoriosFiltrados.map((lab) => {
                const indexOriginal = laboratorios.findIndex((l) => l.id === lab.id);
                return (
                  <div key={lab.id} className="producto-card">
                    <h3>{lab.name}</h3>
                    <p>Dirección: {lab.address}</p>
                    <p>Teléfono: {lab.phoneNumber}</p>
                    <div className="acciones">
                      <button
                        onClick={() => {
                          setIndexAEditar(indexOriginal);
                          setLabEditando(lab);
                          setModalEditarVisible(true);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => {
                          setIdAEliminar(lab.id);
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

          <button className="btn-registrar" onClick={() => setModalRegistrarVisible(true)}>
            ➕ Registrar nuevo laboratorio
          </button>
        </div>

        {modalRegistrarVisible && (
          <ModalLaboratory
            onClose={() => setModalRegistrarVisible(false)}
            onRegistrar={registrarLaboratorio}
          />
        )}

        <ModalConfirmation
          show={modalEliminarVisible}
          message="¿Estás seguro de que deseas eliminar este laboratorio?"
          onConfirm={confirmarEliminar}
          onCancel={() => setModalEliminarVisible(false)}
        />

        <UpdateLaboratory
          show={modalEditarVisible}
          laboratorio={labEditando}
          onSave={guardarLaboratorioEditado}
          onCancel={() => setModalEditarVisible(false)}
        />

        {mostrarMensaje && (
          <Toast mensaje={mensajeToast} onClose={() => setMostrarMensaje(false)} />
        )}
      </main>
    </div>
  );
}

export default Laboratory;

