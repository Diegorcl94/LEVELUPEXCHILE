import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function ProductosList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/productos")
      .then((response) => setProductos(response.data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  return (
    <section className="container mt-5">
      <h2 className="section-title mb-4 text-neon">Catálogo de Juegos 🎮</h2>

      {productos.length === 0 ? (
        <p className="text-secondary">No hay productos registrados.</p>
      ) : (
        <div className="row g-4">
          {productos.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.nombre}
              price={p.precio}
              imgUrl={p.imagen}   
              tag={p.descripcion}
            />
          ))}
        </div>
      )}
    </section>
  );
}
