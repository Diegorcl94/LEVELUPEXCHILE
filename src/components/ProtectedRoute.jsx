import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ❌ Sin token → FUERA
  if (!token) return <Navigate to="/login" />;

  // ❌ Si requiere admin → validar rol
  if (requireAdmin && user.rol !== "ADMIN") {
    return <Navigate to="/" />;
  }

  // ✔ Todo OK
  return children;
}