import React from "react";
import "../styles/searchBar.css"; // Opcional para personalización

function SearchBar({ busqueda, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder || "Buscar..."}
        value={busqueda}
        onChange={onChange}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
