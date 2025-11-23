import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

export default function BannerCarousel() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await apiGet("/banners/listar");
      setBanners(data.filter(b => b.activo));
    }
    load();
  }, []);

  if (banners.length === 0) return null;

  return (
    <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">

        {banners.map((b, i) => (
          <div key={b.id} className={`carousel-item ${i === 0 ? "active" : ""}`} data-bs-interval="5000">

            {/* Si hay enlace → conviértelo en un <a> clickeable */}
            {b.enlace ? (
              <a href={b.enlace}>
                <img
                  src={b.imagen}
                  className="d-block w-100"
                  style={{ height: "450px", objectFit: "cover" }}
                />
              </a>
            ) : (
              <img
                src={b.imagen}
                className="d-block w-100"
                style={{ height: "450px", objectFit: "cover" }}
              />
            )}

            {(b.titulo || b.descripcion) && (
              <div className="carousel-caption d-none d-md-block">
                <h3>{b.titulo}</h3>
                <p>{b.descripcion}</p>
              </div>
            )}
          </div>
        ))}

      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}
