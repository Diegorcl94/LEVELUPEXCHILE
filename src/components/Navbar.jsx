import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

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

        {rol === "ROLE_ADMIN" && (
          <Link to="/admin-panel" className="text-warning">
            Admin Panel ⚡
          </Link>
        )}

        {token ? (
          <>
            <Link to="/perfil">Mi Perfil</Link>
            <button className="btn btn-danger btn-sm" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link className="btn btn-neon btn-sm" to="/login">
            Ingresar
          </Link>
        )}

      </div>
    </nav>
  );
}
