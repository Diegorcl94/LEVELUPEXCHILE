import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [token, setToken] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRol(localStorage.getItem("rol"));
  }, []);

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">🎮 LevelUp</Link>

      <button className="navbar-toggler" type="button" 
        data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>

          {rol === "ADMIN" && (
            <li className="nav-item">
              <Link className="nav-link text-warning" to="/admin-panel">
                Admin Panel ⚡
              </Link>
            </li>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registro">Registrarse</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/perfil">Mi Perfil</Link>
              </li>

              <li className="nav-item">
                <button className="btn btn-danger ms-3" onClick={logout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
