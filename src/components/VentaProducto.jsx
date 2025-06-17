import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ModalAgregarVenta from "./ModalAgregarVenta";
import "../styles/Home.css";
import { deleteSale, getAllSales, getSalesWithDetails, updateSale } from "../services/saleService";
import ModalConfirmation from "./ModalConfirmation";
import Toast from "./Toast";
import UpdateVenta from "./UpdateVenta";

function VentaProducto() {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);
  const [modalRegistrarVisible, setModalRegistrarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [ventaEditando, setVentaEditando] = useState(null);
  const [idAEliminar, setIdAEliminar] = useState(null);

  useEffect(() => {
    getSalesWithDetails()
    .then((response) => {
      setVentas(response.data);
    })
    .catch((error) => {
      console.log("Error al cargar ventas: ",error)
    })
  }, [])
  

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
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

  const registrarVentas = () => {
    getSalesWithDetails()
    .then((response) => {
      setVentas(response.data);
      setModalRegistrarVisible(false);
      mostrarToast("Venta registrada exitosamente");
    })
    .catch(() => {
      mostrarToast("Error al recargar ventas después del registro");
    })
  };

  const guardarVentasEditado = (actualizado) => {
    // ✅ Limpiar los detalles: solo enviar productId y quantity
    const ventaLimpia = {
      id: actualizado.id,
      saleDate: actualizado.saleDate,
      detalles: actualizado.detalles.map((d) => ({
        productId: d.productId,
        quantity: d.quantity,
      })),
    };

    console.log("📦 Enviando venta actualizada:", JSON.stringify(ventaLimpia, null, 2)); // 👈 Aquí lo ves bonito en consola
    updateSale(actualizado.id, ventaLimpia).then(() => {
      const nuevos = [...ventas];
      const idx = nuevos.findIndex((v) => v.id === actualizado.id);
      if (idx !== -1) {
        nuevos[idx] = actualizado;
        setVentas(nuevos);
      }
      setModalEditarVisible(false);
      setVentaEditando(null);
      setIdAEliminar(null);
      mostrarToast("Venta editada exitosamente");
    });
  };

  const confirmarEliminar = () => {
    if (idAEliminar !== null) {
      deleteSale(idAEliminar)
      .then(() => {
        return getSalesWithDetails();
      })
      .then((response) => {
        setVentas(response.data);
        mostrarToast("Venta eliminada exitosamente");
      })
      .catch((error) => {
        console.error("Error al eliminar venta: ",error);
        mostrarToast("Error al eliminar venta.");
      })
      .finally(() => {
        setIdAEliminar(null);
        setModalEliminarVisible(false);
      })
    }
  }

  

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
        <button onClick={() => goTo("/VentaProducto")}>💰 VENTAS</button>
        <button onClick={() => goTo("/inventario")}>📦 INVENTARIO</button>
      </nav>

      <div>
          <button
            className="home-button"
            onClick={() => setModalRegistrarVisible(true)}
            >
            ➕ AGREGAR VENTA
          </button>
        </div>
      <main className="home-main">
        
        <div className="container">
          <h3>Ventas Realizadas</h3>
          <div className="productos-grid">
            { ventas.length===0 ? (
              <p className="sin-resultados">
                No se encontraron ventas.
              </p>
            ) : (
          ventas.slice() // copia para no mutar el estado
      .sort((a, b) => new Date(a.saleDate) - new Date(b.saleDate)) // ascendente
      .map((venta) => {

            return(
              <div className="ventas-card" key={venta.id}>
                <div  className="venta">
                  <h3>Venta #{venta.id}</h3>
                  <p>{new Date(venta.saleDate).toLocaleDateString()}</p>
                  <ul>
                    {venta.detalles && venta.detalles.length > 0 ? (
                      venta.detalles.map((producto) => (
                        <li key={producto.productId}>
                          {producto.productName} - Cantidad: {producto.quantity}
                        </li>
                      ))
                    ) : (
                      <li>No hay productos</li>
                    )}
                  </ul>
                </div>
                <div className="acciones">
                    <button onClick={() => {
                      setVentaEditando(venta);
                      setModalEditarVisible(true);
                    }}>
                      ✏️
                    </button>
                    <button onClick={() => {
                      setIdAEliminar(venta.id);
                      setModalEliminarVisible(true);
                    }}>
                      🗑️
                    </button>
                </div>
          
              </div>
            )}))}
          </div>
        </div>

      {modalRegistrarVisible && (
        <ModalAgregarVenta
          onClose={() => setModalRegistrarVisible(false)}
          onRegistrar={registrarVentas}
        />
      )}

      <ModalConfirmation
        show={modalEliminarVisible}
        message = "Estás seguro que seas eliminar esta venta?"
        onConfirm = {confirmarEliminar}
        onCancel={() => setModalEliminarVisible(false)}
      />

      <UpdateVenta
        show={modalEditarVisible}
        venta={ventaEditando}
        onSave={guardarVentasEditado}
        onCancel={() => setModalEditarVisible(false)}
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


export default VentaProducto;

