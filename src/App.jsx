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

import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import CrearProducto from "./pages/admin/CrearProducto";
import EditarProducto from "./pages/admin/EditarProducto";

// 👉 NUEVOS ADMIN
import BlogAdmin from "./pages/admin/BlogAdmin";
import EventosAdmin from "./pages/admin/EventosAdmin";
import DestacadosAdmin from "./pages/admin/DestacadosAdmin";
import BannerAdmin from "./pages/admin/BannerAdmin"; // 👈 NUEVO

import ProtectedRoute from "./components/ProtectedRoute";

import "./styles/style.css";

function App() {
  return (
    <>
      <Navbar />

      <main className="flex-grow-1 bg-dark text-light">
        <Routes>

          {/* ============ PÚBLICO ============ */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/soporte" element={<Soporte />} />

          {/* ============ USUARIO AUTENTICADO ============ */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />

          {/* ============ ADMIN ============ */}
          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute requireAdmin={true}>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

          {/* PRODUCTOS ADMIN */}
          <Route
            path="/admin-panel/productos"
            element={
              <ProtectedRoute requireAdmin={true}>
                <ProductosAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-panel/productos/crear"
            element={
              <ProtectedRoute requireAdmin={true}>
                <CrearProducto />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-panel/productos/editar/:id"
            element={
              <ProtectedRoute requireAdmin={true}>
                <EditarProducto />
              </ProtectedRoute>
            }
          />

          {/* BLOG ADMIN */}
          <Route
            path="/admin-panel/blog"
            element={
              <ProtectedRoute requireAdmin={true}>
                <BlogAdmin />
              </ProtectedRoute>
            }
          />

          {/* EVENTOS ADMIN */}
          <Route
            path="/admin-panel/eventos"
            element={
              <ProtectedRoute requireAdmin={true}>
                <EventosAdmin />
              </ProtectedRoute>
            }
          />

          {/* DESTACADOS ADMIN */}
          <Route
            path="/admin-panel/destacados"
            element={
              <ProtectedRoute requireAdmin={true}>
                <DestacadosAdmin />
              </ProtectedRoute>
            }
          />

          {/* BANNERS ADMIN */}
          <Route
            path="/admin-panel/banners"
            element={
              <ProtectedRoute requireAdmin={true}>
                <BannerAdmin />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
