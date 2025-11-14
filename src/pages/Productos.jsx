import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/productos")
      .then((response) => setProductos(response.data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <section className="container mt-5">
      <h2 className="section-title mb-4 text-neon text-center">
        Catálogo de Juegos 🎮
      </h2>

      {productos.length === 0 ? (
        <p className="text-secondary text-center">
          No hay productos registrados.
        </p>
      ) : (
        <div className="row g-4">
          {productos.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.nombre}
              price={p.precio}
              imgUrl={p.imagen || "/img/default-game.jpg"}
              tag={p.descripcion || "Juego"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
