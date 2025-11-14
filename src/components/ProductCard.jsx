import { useState } from "react";
import placeholder from "../assets/img/videojuego.jpg"; 

export default function ProductCard({ id, title, price, imgUrl, tag }) {
  const [added, setAdded] = useState(false);

  // ========================
  // Detectar URL o imagen local
  // ========================
  let imagePath = placeholder;

  if (imgUrl) {
    // Caso 1: URL externa
    if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://")) {
      imagePath = imgUrl;
    } 
    // Caso 2: Imagen local desde public/img
    else {
      imagePath = `/img/${imgUrl}`;
    }
  }

  // ========================
  // Botón agregar al carrito
  // ========================
  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="info-card p-3 rounded-4 h-100 bg-dark text-light d-flex flex-column shadow-sm border border-success">

        <img
          src={imagePath}
          alt={title}
          className="img-fluid rounded-3 mb-2"
          style={{
            maxHeight: "230px",
            objectFit: "cover",
            border: "1px solid #198754",
          }}
          onError={(e) => (e.target.src = placeholder)}
        />

        <div className="small text-secondary">{tag}</div>
        <strong className="d-block">{title}</strong>
        <span className="text-neon d-block mb-2">
          ${price?.toLocaleString("es-CL")}
        </span>

        <button
          className="btn btn-sm btn-success w-100 mt-auto"
          onClick={handleAdd}
        >
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
