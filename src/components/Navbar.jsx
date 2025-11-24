import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  // Contador carrito
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-3">

      <Link className="navbar-brand" to="/">🎮 LevelUp</Link>

      <div className="d-flex align-items-center gap-3">

        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/contacto">Contacto</Link>

        {/* CARRITO */}
        <Link to="/carrito" className="btn btn-outline-light btn-sm">
          🛒 {carrito.length}
        </Link>

        {/* ADMIN */}
        {rol === "ROLE_ADMIN" && (
          <Link to="/admin-panel" className="text-warning">
            Admin Panel ⚡
          </Link>
        )}

        {/* SESIÓN */}
        {token ? (
          <>
            <Link to="/perfil">Mi Perfil</Link>
            <button className="btn btn-danger btn-sm" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-neon btn-sm" to="/login">
              Ingresar
            </Link>
            <Link className="btn btn-outline-neon btn-sm" to="/registro">
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
