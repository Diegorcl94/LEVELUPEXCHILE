import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function ProductosList() {
  const [productos, setProductos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {},
    };
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    axios
      .get("http://localhost:8080/productos/listar", config)
      .then((response) => setProductos(response.data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  // === FILTRADO GENERAL FINAL ===
  const productosFiltrados = productos.filter((p) => {
    const cumpleCategoria = filtroCategoria === "todos" || p.categoria === filtroCategoria;

    const cumpleBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    const cumplePrecioMin = precioMin === "" || p.precio >= parseInt(precioMin);
    const cumplePrecioMax = precioMax === "" || p.precio <= parseInt(precioMax);

    return cumpleCategoria && cumpleBusqueda && cumplePrecioMin && cumplePrecioMax;
  });

  return (
    <section className="container mt-5">

      <h2 className="section-title mb-4 text-neon text-center">Catálogo de Productos</h2>

      {/* BUSCADOR */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* FILTROS POR CATEGORÍA (botones) */}
      <div className="d-flex flex-wrap gap-2 mb-4">

        {[
          "todos",
          "nintendo",
          "ps5",
          "pc",
          "clasicos",
          "silla gamer",
          "poleras",
          "articulo pc",
        ].map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${
              filtroCategoria === cat ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setFiltroCategoria(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* FILTRO POR PRECIO */}
      <div className="row mb-4">
        <div className="col-6">
          <input
            type="number"
            className="form-control"
            placeholder="Precio mínimo"
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
          />
        </div>

        <div className="col-6">
          <input
            type="number"
            className="form-control"
            placeholder="Precio máximo"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>
      </div>

      {/* LISTA DE PRODUCTOS */}
      {productosFiltrados.length === 0 ? (
        <p className="text-secondary">No hay productos que coincidan con los filtros.</p>
      ) : (
        <div className="row g-4">
          {productosFiltrados.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              nombre={p.nombre}
              precio={p.precio}
              descripcion={p.descripcion}
              imagen={p.imagen}
              categoria={p.categoria}
            />
          ))}
        </div>
      )}
    </section>
  );
}