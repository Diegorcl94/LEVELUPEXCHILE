import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin }) {
  
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  // No autenticado
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Ruta solo para ADMIN
  if (requireAdmin && rol !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
