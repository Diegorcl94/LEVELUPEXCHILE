import { useState } from "react";
import placeholder from "../assets/img/videojuego.jpg";

export default function ProductCard({ id, nombre, precio, imagen, descripcion, categoria }) {
  const [added, setAdded] = useState(false);

  let imagePath = placeholder;

  if (imagen) {
    if (imagen.startsWith("http://") || imagen.startsWith("https://")) {
      imagePath = imagen;
    } else {
      imagePath = `/img/${imagen}`;
    }
  }

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="info-card p-3 rounded-4 h-100 bg-dark text-light d-flex flex-column shadow-sm border border-success">

        <img
          src={imagePath}
          alt={nombre}
          className="img-fluid rounded-3 mb-2"
          style={{ maxHeight: "230px", objectFit: "cover", border: "1px solid #198754" }}
        />

        {/* CATEGORÍA */}
        {categoria && (
          <div className="badge bg-success text-dark fw-bold mb-1" style={{ width: "fit-content" }}>
            {categoria.toUpperCase()}
          </div>
        )}

        <div className="small text-secondary">{descripcion}</div>

        <strong className="d-block">{nombre}</strong>

        <span className="text-neon d-block mb-2">
          ${precio?.toLocaleString("es-CL")}
        </span>

        <button className="btn btn-success w-100 mt-auto" onClick={handleAdd}>
          Agregar al carrito
        </button>

        {added && (
          <div className="alert alert-success py-1 px-2 mt-2 mb-0 text-center">
            Añadido al carrito 🛒
          </div>
        )}
      </div>
    </div>
  );
}