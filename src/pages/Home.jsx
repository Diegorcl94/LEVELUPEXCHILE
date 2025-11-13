import dragonballsparkin from '../assets/img/dragonballsparkin.png'
import { Routes, Route } from 'react-router-dom'
import Blog from './Blog'
import Carrito from './Carrito'
import Eventos from './Eventos'
import Login from './Login'
import Perfil from './Perfil'
import Productos from './Productos'
import Registro from './Registro'
import Soporte from './Soporte'

export default function Home(){
  return (
    
  <main>
   
    <div id="heroCarousel" className="carousel slide carousel--compact" data-bs-ride="carousel">
            
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="5000">
          <img src={dragonballsparkin} alt="Nuevos lanzamientos gamer"></img>
          <div className="carousel-caption d-none d-md-block">
            <h5 className="section-title">Nuevos lanzamientos</h5>
            <p>APROVECHA LOS DESCUENTOS para correos DUOC (+20% de por vida).</p>
            <a href="/producto" className="btn btn-neon btn-sm">Ver catálogo</a>
          </div>
        </div>
      </div>      
    </div>

    
    <section className="hero text-center text-white py-5">
      <div className="container">
        <h1 className="display-5 fw-bold title-glow">Tu próxima aventura comienza aquí</h1>
        <p className="lead text-secondary">Ofertas, comunidad y eventos. Gana puntos LevelUp con referidos.</p>
        <div className="d-flex gap-3 justify-content-center mt-3">
          <a className="btn btn-neon btn-lg" href="/producto">Explorar Catálogo</a>
          <a className="btn btn-outline-neon btn-lg" href="/eventos">Ver Eventos</a>
        </div>
      </div>
    </section>

    
    <section className="container my-5">
      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <div className="info-card p-4 rounded-4">
            <h3 className="mb-2">Impacto Comunitario</h3>
            <p className="mb-2">Apoyamos eventos locales y streamers chilenos. Parte de las compras financia torneos y becas gamer.</p>
            <div className="small text-secondary">Tus puntos LevelUp pueden canjearse por descuentos y productos.</div>
          </div>
        </div>
      </div>
    </section>

    
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-title">Productos Destacados</h2>
        <a className="btn btn-sm btn-outline-neon" href="producto">Ver todo</a>
      </div>
      <div id="featuredGrid" className="row g-3">
        
        ...
      </div>
    </section>

    
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="section-title">Últimas del Blog</h2>
        <a className="btn btn-sm btn-outline-neon" href="/blog">Ver blog</a>
      </div>
      <div id="blogPreview" className="row g-3"></div>
    </section>

  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </main>   
  )
}