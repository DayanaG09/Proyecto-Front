import React from "react";
import "../styles/searchBar.css"; // Opcional para personalización

function SearchBar({ busqueda, onBusquedaChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
