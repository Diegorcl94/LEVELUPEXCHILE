import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../utils/api";

export default function Blog() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await apiGet("/blog/listar");
      setPosts(data);
    }
    cargar();
  }, []);

  return (
    <main className="container py-4">
      <h1 className="section-title mb-4">Blog</h1>

      {posts.length === 0 && (
        <p className="text-secondary">No hay posts todavía.</p>
      )}

      <div className="row g-4">
        {posts.map((p) => (
          <div key={p.id} className="col-12 col-md-6">
            <div className="p-3 bg-dark text-light rounded-4 h-100">
              
              <img
                src={p.imagen}
                alt={p.titulo}
                className="img-fluid rounded-3 mb-2"
              />

              <h2 className="h5">{p.titulo}</h2>

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
    </main>
  );
}
