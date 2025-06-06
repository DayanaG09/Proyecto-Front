//import { useState } from 'react'

import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Products from './components/products'
import Laboratory from './components/Laboratory'
import VentaProducto from './components/VentaProducto'
import { Routes, Route } from 'react-router-dom'
import Inventory from './components/Inventory'
import Supplier from './components/Supplier'

function App() {

  return (
    <Routes>
  {/* Autenticación */}
  <Route path="/login" element={<Login />} />

  {/* Página principal */}
  <Route path="/home" element={<Home />} />

  {/* Secciones del sistema */}
  <Route path="/productos" element={<Products/>} />
  <Route path="/ventaProducto" element={<VentaProducto />} />
  <Route path="/laboratorio" element={<Laboratory />} />
  <Route path="/proveedores" element={<Supplier />} />
  <Route path="/inventario" element={<Inventory />} />

  {/* Ruta no encontrada */}
  <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
</Routes>
  )
}

export default App
