import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../../utils/api";

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [nuevo, setNuevo] = useState({ titulo: "", descripcion: "", imagen: "" });
  const [editando, setEditando] = useState(null);

  async function cargar() {
    const res = await apiGet("/blog/listar");
    setPosts(res);
  }

  useEffect(() => {
    cargar();
  }, []);

  async function crear(e) {
    e.preventDefault();
    await apiPost("/blog/crear", nuevo);
    setNuevo({ titulo: "", descripcion: "", imagen: "" });
    cargar();
  }

  async function guardarCambios(e) {
    e.preventDefault();
    await apiPut(`/blog/editar/${editando.id}`, editando);
    setEditando(null);
    cargar();
  }

  async function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este post?")) return;
    await apiDelete(`/blog/eliminar/${id}`);
    cargar();
  }

  return (
    <div className="container py-5 text-light">

      <h1 className="section-title mb-4">Administrar Blog</h1>


      {/* 💛 FORMULARIO CREAR */}
      <form onSubmit={crear} className="info-card p-4 rounded-4 mb-5">
        <h3 className="mb-3">Crear Nuevo Post</h3>

        <input
          className="form-control mb-2"
          placeholder="Título"
          value={nuevo.titulo}
          onChange={(e) => setNuevo({ ...nuevo, titulo: e.target.value })}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Descripción"
          rows="3"
          value={nuevo.descripcion}
          onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="URL de imagen"
          value={nuevo.imagen}
          onChange={(e) => setNuevo({ ...nuevo, imagen: e.target.value })}
          required
        />

        <button className="btn btn-success w-100">Crear</button>
      </form>


      {/* 🟦 LISTA DE POSTS */}
      <h3 className="mb-3">Lista de Posts</h3>

      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.titulo}</td>
                <td>
                  <img src={p.imagen} alt="" width="90" className="rounded" />
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditando(p)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(p.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* 🟩 MODAL / FORM EDITAR */}
      {editando && (
        <div className="info-card p-4 rounded-4 mt-4">
          <h3 className="mb-3">Editar Post</h3>

          <form onSubmit={guardarCambios}>
            <input
              className="form-control mb-2"
              value={editando.titulo}
              onChange={(e) => setEditando({ ...editando, titulo: e.target.value })}
              required
            />

            <textarea
              className="form-control mb-2"
              rows="3"
              value={editando.descripcion}
              onChange={(e) => setEditando({ ...editando, descripcion: e.target.value })}
              required
            />

            <input
              className="form-control mb-3"
              value={editando.imagen}
              onChange={(e) => setEditando({ ...editando, imagen: e.target.value })}
              required
            />

            <button className="btn btn-primary w-100">Guardar cambios</button>
          </form>
        </div>
      )}

    </div>
  );
}
