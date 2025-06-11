
import React, { useEffect, useState } from "react";
import "../styles/modalProducts.css"; // Estilos sugeridos abajo
import { getAllLaboratory } from "../services/laboratoryService";
import { getAllSupplier } from "../services/supplierService";
import { createProduct } from "../services/productService";

function ModalProducts({ onClose, onRegistrar }) {

  const [producto, setProducto] = useState({});
  const [laboratorios, setlaboratorios] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    getAllLaboratory().then((res) => {
      setlaboratorios(res.data);
    }).catch((err) => console.error("Error al cargar laboratorios", err));

    getAllSupplier().then((res) => {
      setProveedores(res.data);
    }).catch((err) => console.error("Error al cargar proveedores", err));
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(() => ({
      ...producto,
      [name]: name === "laboratoryId" ? parseInt(value) : value,
      [name]: name === "supplierId" ? parseInt(value) :value,
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createProduct(producto);
    onRegistrar(response.data);
  }


  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Registrar Producto</h2>
        <form onSubmit={handleSubmit} className="formulario">
          <input
            type="text"
            name="name"
            value={producto.name || ""}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            type="number"
            name="stock"
            value={producto.stock || ""}
            onChange={handleChange}
            placeholder="Cantidad"
          />
          <input
            type="text"
            name="price"
            value={producto.price || ""}
            onChange={handleChange}
            placeholder="Precio"
          />
          <label className="checkbox-label">
            <span>Fecha ingreso</span>
          </label>
          <input
            type="date"
            name="issueDate"
            value={producto.issueDate || ""}
            onChange={handleChange}
          />
          <select name="supplierId" value={producto.supplierId || ""} onChange={handleChange}>
            <option value="">Seleccione proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id} value={prov.id}>{prov.name}</option>
            ))}
          </select>
          <select name="laboratoryId" value={producto.laboratoryId || ""} onChange={handleChange}>
            <option value="">Seleccione laboratorio</option>
            {laboratorios.map((lab) => (
              <option key={lab.id} value={lab.id}>{lab.name}</option>
            ))}
          </select>
          <input
            type="text"
            name="batch"
            value={producto.batch || ""}
            onChange={handleChange}
            placeholder="Lote"
          />
          <label className="checkbox-label">
            <span>Fecha vencimiento</span>
          </label>
          <input
            type="date"
            name="expirationDate"
            value={producto.expirationDate || ""}
            onChange={handleChange}
          />
          <div className="modal-buttons">
            <button type="submit">Registrar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalProducts;
