import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Componentes/Header/Header';
import Home from './Componentes/Home/Home';
import About from './Componentes/About/About';
import Productos from './Componentes/Productos/Productos';
import DetalleProducto from './Componentes/DetalleProducto/DetalleProducto';
import Cliente from './Componentes/Cliente/Cliente';
import HistorialCompras from './Componentes/HistorialCompras/HistorialCompras';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/cliente/:id" element={<Cliente />} />
        <Route path="/historial" element={<HistorialCompras />} />
        

        
      </Routes>
      
    </Router>
  );
}

export default App;
