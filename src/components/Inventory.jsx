import React, { useState } from "react";
import "../styles/inventory.css";
import logo from "../assets/logo.png";
import { inventarioInicial } from "./InventoryLogic";
import ModalConfirmation from "./ModalConfirmation";
import UpdateProduct from "./UpdateProduct";
import  { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";



function Inventory() {
    const navigate = useNavigate();
  const [productos, setProductos] = useState(inventarioInicial);

  const [busqueda, setBusqueda] = useState("");

  const [desde, setDesde] = useState("");
const [hasta, setHasta] = useState("");

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

  const eliminarProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);
  };

  const confirmar = () => {
    if (indexAEliminar !== null) {
      eliminarProducto(indexAEliminar);
      setIndexAEliminar(null);
      setModalVisible(false);
    }
  };

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };


  const guardarProductoEditado = (productoActualizado) => {
    const nuevosProductos = [...productos];
    nuevosProductos[indexAEditar] = productoActualizado;
    setProductos(nuevosProductos);
    setModalEditarVisible(false);
    setProductoEditando(null);
    setIndexAEditar(null);
  };

  const generarInformePorFechas = () => {
  if (!desde || !hasta) {
    alert("Seleccione un rango de fechas");
    return;
  }

  const filtrados = productos.filter((p) => {
    return p.fecha >= desde && p.fecha <= hasta;
  });

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
  return (
    
    <div className="inventario-container">
      
      <aside className="sidebar">
  <nav className="sidebar-nav ">
    <img src={logo} alt="Logo" className="logo" />
    <button className="sidebar-button" onClick={() => navigate("/home")}>🏠 INICIO</button>
    <button className="sidebar-button" onClick={() => navigate("/laboratorio")}>🧪 LABORATORIO</button>
    <button  className="sidebar-button" onClick={() => navigate("/proveedores")}>📦 PROVEEDORES</button>
    <button  className="sidebar-button" onClick={() => navigate("/Productos")}>💊 PRODUCTOS</button>
    <button className="sidebar-button" onClick={() => navigate("/inventario")}>📋 INVENTARIO</button>
    <button className="sidebar-button" onClick={() => navigate("/ventaProducto")}>💰 VENTAS</button>
  </nav>
</aside>

      <main className="main">
        <div className="header">
          <h1>INVENTARIO</h1>
          <div className="header-icons">
            <div className="right">
          <input
            type="text"
            placeholder="Buscar..."
            className="search"
            value={busqueda}
            onChange={handleSearch}
          />
            </div>
            <button className="logout" onClick={handleLogout}>
            🔓 LOGOUT
          </button>
          </div>
        </div>

        <div className="tabla">
          <div className="tabla-header">
            <span>F. INGRESO</span>
            <span>NOMBRE PRODUCTO</span>
            <span>CANTIDAD</span>
            <span>PRECIO</span>
            <span>PROVEEDOR</span>
            <span>LAB</span>
            <span>LOT</span>
            <span>F.VENCIMIEN</span>
            <span>ACCIONES</span>
          </div>

          {productos
  .filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )
  .map((p, i) => (
    <div key={i} className="fila">
      <span>{p.fecha}</span>
      <span>{p.nombre}</span>
      <span>{p.cantidad}</span>
      <span>{p.precio}</span>
      <span>{p.proveedor}</span>
      <span>{p.lab}</span>
      <span>{p.lote}</span>
      <span>{p.vencimiento}</span>
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
          onConfirm={confirmar}
          onCancel={() => setModalVisible(false)}
        />

        <UpdateProduct
          show={modalEditarVisible}
          producto={productoEditando}
          onSave={guardarProductoEditado}
          onCancel={() => setModalEditarVisible(false)}
        />
      </main>
    </div>
  );
}

export default Inventory;

