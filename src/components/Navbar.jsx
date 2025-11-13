import { NavLink, Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">LEVEL-UP GAMER</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navMain" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/producto">Catálogo</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/eventos">Eventos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/soporte">Soporte</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/carrito"><i className="bi bi-cart"></i> Carrito</NavLink></li>
          </ul>

          <div className="d-flex gap-2">
            <NavLink className="btn btn-outline-light btn-sm" to="/perfil"><i className="bi bi-person"></i> Perfil</NavLink>
            <NavLink className="btn btn-light btn-sm" to="/registro">Regístrate</NavLink>
            <NavLink className="btn btn-outline-light btn-sm" to="/login">Ingresar</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}