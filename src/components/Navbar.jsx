import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo2.png";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">

      {/* LOGO ANIMADO */}
      <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
        <img
          src={logo}
          alt="LevelUp Logo"
          className="logo-animado"
          style={{ height: "45px" }}
        />
        <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>LevelUp</span>
      </Link>

      {/* BOTÓN HAMBURGUESA 📱 */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menuLevelUp"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* MENU COLAPSABLE */}
      <div className="collapse navbar-collapse" id="menuLevelUp">
        <div className="ms-auto d-flex flex-column flex-lg-row align-items-lg-center gap-3 py-3 py-lg-0">

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
      </div>
    </nav>
  );
}
