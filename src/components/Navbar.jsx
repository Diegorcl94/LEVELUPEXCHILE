import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";

function Navbar() {
  const navigate = useNavigate();

  // ===============================
  //  ESTADO DE USER SEGURO
  // ===============================
  const [user, setUser] = useState(null);
  const [carritoCount, setCarritoCount] = useState(0);

  useEffect(() => {
    // USER seguro
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      if (u.email) setUser(u);
    } catch {
      setUser(null);
    }

    // CARRITO seguro
    try {
      const c = JSON.parse(localStorage.getItem("carrito") || "[]");
      setCarritoCount(c.length);
    } catch {
      setCarritoCount(0);
    }
  }, []);

  // ===============================
  // LOGOUT
  // ===============================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // refresca navbar
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-neon">
      <div className="container">

        <Link className="navbar-brand text-neon" to="/">
          🎮 LevelUp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Inicio</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-light" to="/productos">Productos</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-light" to="/contacto">Contacto</Link>
            </li>

            {/* SESIÓN INICIADA */}
            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-light"
                    to={user.rol === "ADMIN" ? "/admin-panel" : "/perfil"}
                  >
                    {user.rol === "ADMIN" ? "Panel Admin" : "Mi perfil"}
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* SIN SESIÓN */}
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/login">Iniciar sesión</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-light" to="/registro">Registrarse</Link>
                </li>
              </>
            )}

            {/* ICONO CARRITO */}
            <li className="nav-item ms-3">
              <Link className="nav-link text-light position-relative" to="/carrito">
                🛒
                {carritoCount > 0 && (
                  <span
                    className="badge bg-success position-absolute"
                    style={{ top: "-5px", right: "-12px" }}
                  >
                    {carritoCount}
                  </span>
                )}
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;