import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

import imgDragonBall from "../assets/img/dragonballsparkin.png";
import imgZelda from "../assets/img/zeldataers.jpg";
import imgMario from "../assets/img/mario64.jpg";

export default function Productos(){ 
  
  const [query, setQuery] = useState("");
  const [products] = useState([
    { id: 1, title: "Dragon Ball: Sparking Zero", price: 59990, imgUrl: imgDragonBall, tag: "PS5" },
    { id: 2, title: "Zelda: Tears of the Kingdom", price: 49990, imgUrl: imgZelda, tag: "Switch" },
    { id: 3, title: "Mario 64", price: 39990, imgUrl: imgMario, tag: "N64" }
  ]);

   const filtrados = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.tag.toLowerCase().includes(query.toLowerCase())
  );
  
  return (
    <main>
      <main className="container py-5">
        <h1 className="section-title mb-4">Catálogo</h1>

        <div className="input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-search" />
            </span>
            <input
              className="form-control"
              placeholder="Buscar por nombre o consola…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
        </div>

        <div className="row g-3">
            {filtrados.map(p => (
              <ProductCard key={p.id} {...p} />
            ))}
        </div>
      </main>
  </main>
  );
}