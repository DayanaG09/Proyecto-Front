export const inventarioInicial = [
  {
    fecha: "2025-05-20",
    nombre: "Paracetamol",
    cantidad: 30,
    precio: "12.00",
    proveedor: "Proveedor A",
    lab: "Lab X",
    lote: "123ABC",
    vencimiento: "2025-12-01",
  },
  {
    fecha: "2025-05-21",
    nombre: "Ibuprofeno",
    cantidad: 50,
    precio: "15.00",
    proveedor: "Proveedor B",
    lab: "Lab Y",
    lote: "456DEF",
    vencimiento: "2026-03-15",
  },
];

export const eliminarProducto = (productos, index) => {
  const nuevosProductos = [...productos];
  nuevosProductos.splice(index, 1);
  return nuevosProductos;
};
export const agregarProducto = (productos, nuevoProducto) => {
  return [...productos, nuevoProducto];
};
export const editarProducto = (productos, index, productoEditado) => {
  const nuevosProductos = [...productos];
  nuevosProductos[index] = productoEditado;
  return nuevosProductos;
};