import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  // ❌ Si no hay token → NO ENTRA
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 Validar rol si la ruta necesita admin
  if (requireAdmin && rol !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
