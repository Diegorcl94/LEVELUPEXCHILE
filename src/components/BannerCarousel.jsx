import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

export default function BannerCarousel() {

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await apiGet("/banners/listar");
      const activos = data
        .filter(b => b.activo)
        .sort((a, b) => a.orden - b.orden);

      setBanners(activos);
    }

    cargar();
  }, []);

  if (banners.length === 0) {
    return null;
  }

  return (
    <div id="mainBanner" className="carousel slide" data-bs-ride="carousel">

      {/* ITEMS */}
      <div className="carousel-inner">

        {banners.map((b, index) => (
          <div
            key={b.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            data-bs-interval="5000"
          >

            <img
              src={b.imagen}
              alt={b.titulo}
              className="d-block w-100"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />

            <div className="carousel-caption d-none d-md-block">
              <h2 className="fw-bold">{b.titulo}</h2>
              <p>{b.descripcion}</p>

              {b.enlace && (
                <a href={b.enlace} className="btn btn-neon btn-sm">
                  Ir a enlace
                </a>
              )}
            </div>
          </div>
        ))}

      </div>

      {/*  <-- CONTROL LEFT --> */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#mainBanner"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>

      {/*  --> CONTROL RIGHT --> */}
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#mainBanner"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>

    </div>
  );
}
