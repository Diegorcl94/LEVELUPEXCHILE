import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Carrito from "./pages/Carrito";
import Eventos from "./pages/Eventos";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Productos from "./pages/Productos";
import Registro from "./pages/Registro";
import Soporte from "./pages/Soporte";
import BlogPost from "./pages/BlogPost";

import ProtectedRoute from "./components/ProtectedRoute";

// ADMIN
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import CrearProducto from "./pages/admin/CrearProducto";
import EditarProducto from "./pages/admin/EditarProducto";
import ProductosAdmin from "./pages/admin/ProductosAdmin";

export default function RouterView() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/soporte" element={<Soporte />} />
      <Route path="/carrito" element={<Carrito />} />

      {/* RUTAS PROTEGIDAS */}
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-panel"
        element={
          <ProtectedRoute requireAdmin={true}>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/productos"
        element={
          <ProtectedRoute requireAdmin={true}>
            <ProductosAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/productos/crear"
        element={
          <ProtectedRoute requireAdmin={true}>
            <CrearProducto />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/productos/editar/:id"
        element={
          <ProtectedRoute requireAdmin={true}>
            <EditarProducto />
          </ProtectedRoute>
        }
      />

      {/* LOGIN / REGISTRO */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
}