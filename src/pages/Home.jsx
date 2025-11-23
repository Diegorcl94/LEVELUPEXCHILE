import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";
import BannerCarousel from "../components/BannerCarousel";

export default function Home() {

  const [blog, setBlog] = useState([]);
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    async function cargarData() {

      // BLOG: últimos 4 posts
      const posts = await apiGet("/blog/listar");
      const ordenados = posts
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 4);
      setBlog(ordenados);

      // DESTACADOS: últimos 4
      const des = await apiGet("/destacados/listar");
      setDestacados(des.slice(0, 4));
    }

    cargarData();
  }, []);

  return (
    <main>

      {/* ================================
          HERO DINÁMICO (BANNERS)
         ================================= */}
      <BannerCarousel />

      {/* ================================
          SECCIÓN IMPACTO
         ================================= */}
      <section className="hero text-center text-white py-5">
        <div className="container">
          <h1 className="display-5 fw-bold title-glow">Tu próxima aventura comienza aquí</h1>
          <p className="lead text-secondary">Ofertas, comunidad y eventos. Gana puntos LevelUp con referidos.</p>

          <div className="d-flex gap-3 justify-content-center mt-3">
            <a className="btn btn-neon btn-lg" href="/productos">Ver productos</a>
            <a className="btn btn-outline-neon btn-lg" href="/eventos">Ver Eventos</a>
          </div>
        </div>
      </section>

      {/* ================================
          DESTACADOS DINÁMICOS
         ================================= */}
      <section className="container my-5">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title">Destacados</h2>
          <a className="btn btn-sm btn-outline-neon" href="/productos">Ver productos</a>
        </div>

        <div className="row g-3">
          {destacados.length === 0 && (
            <p className="text-secondary">No hay destacados aún.</p>
          )}

          {destacados.map((d) => (
            <div key={d.id} className="col-12 col-md-6 col-lg-3">
              <div className="info-card p-3 rounded-4 h-100 bg-dark text-light shadow-sm border border-success">

                <img
                  src={d.imagen}
                  alt={d.titulo}
                  className="img-fluid rounded-3 mb-2"
                  style={{ maxHeight: "220px", objectFit: "cover" }}
                />

                <strong>{d.titulo}</strong>
                <p className="small text-secondary">{d.descripcion}</p>

              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ================================
          BLOG DINÁMICO
         ================================= */}
      <section className="container my-5">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title">Últimas del Blog</h2>
          <a className="btn btn-sm btn-outline-neon" href="/blog">Ver blog</a>
        </div>

        <div className="row g-3">

          {blog.length === 0 && (
            <p className="text-secondary">No hay posts disponibles.</p>
          )}

          {blog.map((p) => (
            <div key={p.id} className="col-12 col-md-6 col-lg-3">
              <div className="p-3 bg-dark text-light rounded-4 h-100">

                <img
                  src={p.imagen}
                  alt={p.titulo}
                  className="img-fluid rounded-3 mb-2"
                  style={{ height: "160px", objectFit: "cover" }}
                />

                <h5>{p.titulo}</h5>

                <Link
                  className="btn btn-outline-light btn-sm mt-2"
                  to={`/blog/${p.id}`}
                >
                  Leer más
                </Link>

              </div>
            </div>
          ))}

        </div>
      </section>

    </main>
  );
}
