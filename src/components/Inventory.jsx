import React, { useEffect, useState } from "react";
import "../styles/inventory.css";
import logo from "../assets/logo.png";
import ModalConfirmation from "./ModalConfirmation";
import UpdateProduct from "./UpdateProduct";
import  { useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts, updateProduct } from "../services/productService";
import { getAllLaboratory } from "../services/laboratoryService";
import Toast from "./Toast";


function Inventory() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [laboratorios, setLaboratorios] = useState([]);
  

  useEffect(() => {
    getAllProducts().
    then((response) => {
      setProductos(response.data);
    })
    .catch((error) => {
      console.log("Error al cargar productos: ",error);
    });

    getAllLaboratory()
    .then((response) => {
      setLaboratorios(response.data);
    })
    .catch((error) => {
      console.log("Error al cargar laboratorios: ", error);
    });
  }, [])
  
  const getNombreLaboratorio = (id) => {
  const lab = laboratorios.find((l) => l.id === id);
  return lab ? lab.name : "Desconocido";
};


  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  // Modal Eliminar
  const [modalVisible, setModalVisible] = useState(false);
  const [indexAEliminar, setIndexAEliminar] = useState(null);

  // Modal Editar
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [indexAEditar, setIndexAEditar] = useState(null);

    const [mensajeToast, setMensajeToast] = useState("");
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    const mostrarToast = (mensaje) => {
      setMensajeToast(mensaje);
      setMostrarMensaje(true);
    };

  const confirmarEliminar = () => {
    if (indexAEliminar !== null) {
      const producto = productos[indexAEliminar]
      deleteProduct(producto.id)
      .then(() => {
        const nuevosProductos = [...productos];
        nuevosProductos.splice(indexAEliminar,1);
        setProductos(nuevosProductos);
        setIndexAEliminar(null);
        setModalVisible(false);
        mostrarToast("Producto eliminado exitosamente");
      })
      .catch(error => {
        console.error("Error al eliminar producto: ", error);
        mostrarToast("Error al eliminar producto");
      });
      
    }
  };

  const guardarProductoEditado = (productoActualizado) => {
    updateProduct(productoActualizado.id, productoActualizado)
    .then(() => {
      const nuevosProductos = [...productos];
      nuevosProductos[indexAEditar] = productoActualizado;
      setProductos(nuevosProductos);
      setModalEditarVisible(false);
      setProductoEditando(null);
      setIndexAEditar(null);
      mostrarToast("Producto editado exitosamente!")
    })
    .catch(error => {
      console.error("Error al editar producto:", error);
      mostrarToast("Error al editar producto");
    });
  };

  return (
    <div className="inventario-container">
      <aside className="sidebar">
  <nav className="sidebar-nav">
    <img src={logo} alt="Logo" className="logo" />
    <button onClick={() => navigate("/home")}>🏠 INICIO</button>
    <button onClick={() => navigate("/laboratorio")}>🧪 LABORATORIO</button>
    <button onClick={() => navigate("/proveedores")}>📦 PROVEEDORES</button>
    <button onClick={() => navigate("/Productos")}>💊 PRODUCTOS</button>
    <button onClick={() => navigate("/inventario")}>📋 INVENTARIO</button>
    <button onClick={() => navigate("/ventaProducto")}>💰 VENTAS</button>
  </nav>
</aside>

      <main className="main">
        <div className="header">
          <h1>INVENTARIO</h1>
          <div className="header-icons">
            <button>🏠</button>
            <button className="logout" onClick={handleLogout}>
            🔓 LOGOUT
          </button>
          </div>
        </div>

        <div className="tabla">
          <div className="tabla-header">
            <span>FECHA DE INGRESO</span>
            <span>NOMBRE PRODUCTO</span>
            <span>CANTIDAD</span>
            <span>PRECIO</span>
            <span>LAB</span>
            <span>LOT</span>
            <span>F.VENCIMIEN</span>
            <span>ACCIONES</span>
          </div>

          {productos.map((p, i) => (
            <div key={i} className="fila">
              <span>{p.issueDate}</span>
              <span>{p.name}</span>
              <span>{p.stock}</span>
              <span>{p.price}</span>
              <span>{getNombreLaboratorio(p.laboratoryId)}</span>
              <span>{p.batch}</span>
              <span>{p.expirationDate}</span>
              <span className="acciones">
                <button
                  onClick={() => {
                    setIndexAEditar(i);
                    setProductoEditando(p);
                    setModalEditarVisible(true);
                  }}
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    setIndexAEliminar(i);
                    setModalVisible(true);
                  }}
                >
                  🗑️
                </button>
              </span>
            </div>
          ))}
        </div>

        <button className="informe-btn">GENERAR INFORME</button>

        <ModalConfirmation
          show={modalVisible}
          message="¿Estás seguro de que deseas eliminar este producto?"
          onConfirm={confirmarEliminar}
          onCancel={() => setModalVisible(false)}
        />

        <UpdateProduct
          show={modalEditarVisible}
          producto={productoEditando}
          onSave={guardarProductoEditado}
          onCancel={() => setModalEditarVisible(false)}
          laboratorios={laboratorios}
        />

        {mostrarMensaje && (
          <Toast 
            mensaje={mensajeToast}
            onClose = {() => setMostrarMensaje(false)}
          />
        )}
      </main>
    </div>
  );
}

export default Inventory;

