import { Link } from "react-router-dom";
import "../styles/layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          HAYBET
          <br />
          <span>+SALUD</span>
        </div>
        <nav>
          <Link to="/registrar" className="sidebar-btn">
            📋 Registrar
          </Link>
          <Link to="/ventas" className="sidebar-btn">
            🛒 Ventas
          </Link>
          <Link to="/inventario" className="sidebar-btn">
            📦 Inventario
          </Link>
        </nav>
      </aside>
      <main className="main-content">
        <div className="topbar">
          <Link to="/" className="icon-btn">
            🏠
          </Link>
          <Link to="/logout" className="icon-btn">
            ➡️
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}

export default Layout;