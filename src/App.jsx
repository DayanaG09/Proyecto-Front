//import { useState } from 'react'

import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Products from './components/products'
import Laboratory from './components/Laboratory'
import VentaProducto from './components/VentaProducto'
import { Routes, Route, Navigate } from 'react-router-dom'
import Inventory from './components/Inventory'
import Supplier from './components/Supplier'
import ResetPassword from './components/ResetPassword'

function App() {

  return (
    <Routes>
      {/* Ruta inicial */}
      <Route path="/" element={<Navigate to="/login" replace />} />

  {/* Autenticación */}
  <Route path="/login" element={<Login />} />

  {/* Página principal */}
  <Route path="/home" element={<Home />} />
  <Route path="/reset-password" element={<ResetPassword />} />

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
