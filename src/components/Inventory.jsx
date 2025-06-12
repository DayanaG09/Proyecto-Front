import React, { useEffect, useState } from "react";
import "../styles/inventory.css";
import logo from "../assets/logo.png";
import ModalConfirmation from "./ModalConfirmation";
import UpdateProduct from "./UpdateProduct";
import { useNavigate } from "react-router-dom";
import { disableProduct, getActiveProducts, updateProduct } from "../services/productService";
import { getAllLaboratory } from "../services/laboratoryService";
import Toast from "./Toast";
import SearchBar from "./SearchBar"; // 👉 Nuevo componente

function Inventory() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);

  const [busqueda, setBusqueda] = useState(""); // 👉 Estado para búsqueda

  const [modalVisible, setModalVisible] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [indexAEditar, setIndexAEditar] = useState(null);

  const [mensajeToast, setMensajeToast] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const [desde, setDesde] = useState(""); // 👉 Para filtros de informe
  const [hasta, setHasta] = useState("");

  useEffect(() => {
    getActiveProducts()
      .then((response) => setProductos(response.data))
      .catch((error) => console.log("Error al cargar productos: ", error));

    getAllLaboratory()
      .then((response) => setLaboratorios(response.data))
      .catch((error) => console.log("Error al cargar laboratorios: ", error));
  }, []);

  const getNombreLaboratorio = (id) => {
    const lab = laboratorios.find((l) => l.id === id);
    return lab ? lab.name : "Desconocido";
  };

  const mostrarToast = (mensaje) => {
    setMensajeToast(mensaje);
    setMostrarMensaje(true);
  };

  const confirmarEliminar = () => {
    if (idAEliminar !== null) {
      disableProduct(idAEliminar)
        .then(() => getActiveProducts())
        .then((response) => {
          setProductos(response.data);
          mostrarToast("Producto eliminado exitosamente");
        })
        .catch((error) => {
          console.error("Error al eliminar producto:", error);
          mostrarToast("Error al eliminar producto.");
        })
        .finally(() => {
          setIdAEliminar(null);
          setModalVisible(false);
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
        mostrarToast("Producto editado exitosamente!");
      })
      .catch((error) => {
        console.error("Error al editar producto:", error);
        mostrarToast("Error al editar producto");
      });
  };

  const generarInformePorFechas = () => {
    if (!desde || !hasta) {
      alert("Seleccione un rango de fechas");
      return;
    }

    const filtrados = productos.filter((p) => p.fecha >= desde && p.fecha <= hasta);
    imprimirInforme(filtrados, `Informe del ${desde} al ${hasta}`);
  };

  const generarInformeProximosAVencer = () => {
    const hoy = new Date();
    const en30dias = new Date();
    en30dias.setDate(hoy.getDate() + 30);

    const filtrados = productos.filter((p) => {
      const fechaVenc = new Date(p.vencimiento);
      return fechaVenc >= hoy && fechaVenc <= en30dias;
    });

    imprimirInforme(filtrados, "Productos próximos a vencer");
  };

  const imprimirInforme = (lista, titulo) => {
    const ventana = window.open("", "_blank");
    const contenido = `
      <html>
      <head><title>${titulo}</title></head>
      <body>
        <h2>${titulo}</h2>
        <table border="1" cellpadding="6" cellspacing="0">
          <tr>
            <th>Fecha Ingreso</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Proveedor</th>
            <th>Laboratorio</th>
            <th>Lote</th>
            <th>Vencimiento</th>
          </tr>
          ${lista.map(p => `
            <tr>
              <td>${p.fecha}</td>
              <td>${p.nombre}</td>
              <td>${p.cantidad}</td>
              <td>${p.precio}</td>
              <td>${p.proveedor}</td>
              <td>${p.lab}</td>
              <td>${p.lote}</td>
              <td>${p.vencimiento}</td>
            </tr>
          `).join("")}
        </table>
        <script>window.print()</script>
      </body>
      </html>
    `;
    ventana.document.write(contenido);
    ventana.document.close();
  };

  const productosFiltrados = productos.filter(p =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  return (
    <div className="inventario-container">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <img src={logo} alt="Logo" className="logo" />
          <button className="sidebar-button" onClick={() => navigate("/home")}>🏠 INICIO</button>
          <button className="sidebar-button" onClick={() => navigate("/laboratorio")}>🧪 LABORATORIO</button>
          <button className="sidebar-button" onClick={() => navigate("/proveedores")}>📦 PROVEEDORES</button>
          <button className="sidebar-button" onClick={() => navigate("/Productos")}>💊 PRODUCTOS</button>
          <button className="sidebar-button" onClick={() => navigate("/inventario")}>📋 INVENTARIO</button>
          <button className="sidebar-button" onClick={() => navigate("/ventaProducto")}>💰 VENTAS</button>
        </nav>
      </aside>

      <main className="main">
        <div className="header">
          <h1>INVENTARIO</h1>
          <div className="header-icons">
            <SearchBar busqueda={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar producto..." />
            <button className="logout" onClick={handleLogout}>🔓 Cerrar Sesion</button>
          </div>
        </div>

        <div className="tabla">
          <div className="tabla-header">
            <span>F. INGRESO</span>
            <span>NOMBRE PRODUCTO</span>
            <span>CANTIDAD</span>
            <span>PRECIO</span>
            <span>LAB</span>
            <span>LOT</span>
            <span>F.VENCIMIEN</span>
            <span>ACCIONES</span>
          </div>

          {productosFiltrados.map((p, i) => (
            <div key={i} className="fila">
              <span>{p.issueDate}</span>
              <span>{p.name}</span>
              <span>{p.stock}</span>
              <span>{p.price}</span>
              <span>{getNombreLaboratorio(p.laboratoryId)}</span>
              <span>{p.batch}</span>
              <span>{p.expirationDate}</span>
              <span className="acciones">
                <button onClick={() => {
                  setIndexAEditar(i);
                  setProductoEditando(p);
                  setModalEditarVisible(true);
                }}>✏️</button>
                <button onClick={() => {
                  setIdAEliminar(p.id);
                  setModalVisible(true);
                }}>🗑️</button>
              </span>
            </div>
          ))}
        </div>

        <div className="informe-section">
          <h3>Generar Informe</h3>
          <div className="filtros-informe">
            <div>
              <label>Desde:</label>
              <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
            </div>
            <div>
              <label>Hasta:</label>
              <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
            </div>
            <button onClick={generarInformePorFechas}>📄 Por Fechas de ingreso</button>
            <button onClick={generarInformeProximosAVencer}>⚠️ Próximos a vencer</button>
          </div>
        </div>

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
          <Toast mensaje={mensajeToast} onClose={() => setMostrarMensaje(false)} />
        )}
      </main>
    </div>
  );
}

export default Inventory;
