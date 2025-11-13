import { useState } from "react";
import placeholder from "../assets/img/videojuego.jpg"; 

export default function ProductCard({ id, title, price, imgUrl, tag }) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    // podríamos notificar al carrito global aquí en el futuro,
    // pero por ahora solo marcamos visualmente que se "añadió"
    setTimeout(() => setAdded(false), 2000); // quita el mensaje después de 2s
  }

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="info-card p-3 rounded-4 h-100 bg-dark text-light d-flex flex-column">
        <img
          src={imgUrl || placeholder}
          alt={title}
          className="img-fluid rounded-3 mb-2"
        />

        <div className="small text-secondary">{tag}</div>
        <strong className="d-block">{title}</strong>
        <span className="text-neon d-block mb-2">
          ${price.toLocaleString("es-CL")}
        </span>

        <button
          className="btn btn-sm btn-primary w-100 mt-auto"
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