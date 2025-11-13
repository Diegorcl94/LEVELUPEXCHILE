import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-neon">
      <div className="container">
        <Link className="navbar-brand text-neon" to="/">🎮 LevelUp</Link>
        <div className="collapse navbar-collapse">
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
