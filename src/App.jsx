import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Eventos from "./pages/Eventos";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import Soporte from "./pages/Soporte";
import "./styles/style.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow-1 bg-dark text-light">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/soporte" element={<Soporte />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
