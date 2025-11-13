import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductosList from "./components/ProductosList";
import { Routes, Route } from "react-router-dom";
import "./styles/style.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="container mt-5">
        <Routes>
          <Route path="/" element={<h1>Bienvenido a LevelUp Store</h1>} />
          <Route path="/productos" element={<ProductosList />} />
          <Route path="/contacto" element={<p>Correo: soporte@levelupgamer.cl</p>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
