import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";

export default function BlogPost() {

  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function cargar() {
      const data = await apiGet("/blog/listar");
      const encontrado = data.find((p) => p.id === Number(id));
      setPost(encontrado);
    }
    cargar();
  }, [id]);

  if (!post) {
    return (
      <main className="container py-4 text-light">
        <h1>Post no encontrado</h1>
        <p className="text-secondary">Puede que haya sido eliminado o no exista.</p>
      </main>
    );
  }

  return (
    <main className="container py-4 text-light">

      <img
        src={post.imagen}
        alt={post.titulo}
        className="img-fluid rounded-4 mb-3"
      />

      <h1 className="section-title mb-3">{post.titulo}</h1>

      <p className="fs-5" style={{ whiteSpace: "pre-line" }}>
        {post.descripcion}
      </p>

    </main>
  );
}
