import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../../utils/api";

export default function EventosAdmin() {
  const [eventos, setEventos] = useState([]);
  const [nuevo, setNuevo] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
    fechaEvento: "",
    lugar: ""
  });

  const [editando, setEditando] = useState(null);

  async function cargar() {
    const res = await apiGet("/eventos/listar");
    setEventos(res);
  }

  useEffect(() => {
    cargar();
  }, []);

  async function crear(e) {
    e.preventDefault();
    await apiPost("/eventos/crear", nuevo);

    setNuevo({
      titulo: "",
      descripcion: "",
      imagen: "",
      fechaEvento: "",
      lugar: ""
    });

    cargar();
  }

  async function guardarCambios(e) {
    e.preventDefault();
    await apiPut(`/eventos/editar/${editando.id}`, editando);
    setEditando(null);
    cargar();
  }

  async function eliminar(id) {
    if (!confirm("¿Seguro que quieres eliminar este evento?")) return;
    await apiDelete(`/eventos/eliminar/${id}`);
    cargar();
  }

  return (
    <div className="container py-5 text-light">

      <h1 className="section-title mb-4">Administrar Eventos</h1>

      {/* FORMULARIO CREAR */}
      <form onSubmit={crear} className="info-card p-4 rounded-4 mb-5">
        <h3 className="mb-3">Crear Nuevo Evento</h3>

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
          className="form-control mb-2"
          placeholder="URL de imagen"
          value={nuevo.imagen}
          onChange={(e) => setNuevo({ ...nuevo, imagen: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Fecha del evento (Ej: 20 Noviembre 2025)"
          value={nuevo.fechaEvento}
          onChange={(e) => setNuevo({ ...nuevo, fechaEvento: e.target.value })}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Lugar del evento"
          value={nuevo.lugar}
          onChange={(e) => setNuevo({ ...nuevo, lugar: e.target.value })}
          required
        />

        <button className="btn btn-success w-100">Crear Evento</button>
      </form>

      {/* LISTA DE EVENTOS */}
      <h3 className="mb-3">Lista de Eventos</h3>

      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Imagen</th>
              <th>Fecha</th>
              <th>Lugar</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {eventos.map((ev) => (
              <tr key={ev.id}>
                <td>{ev.id}</td>
                <td>{ev.titulo}</td>
                <td>
                  <img src={ev.imagen} alt="" width="90" className="rounded" />
                </td>
                <td>{ev.fechaEvento}</td>
                <td>{ev.lugar}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditando(ev)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(ev.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MODAL EDITAR */}
      {editando && (
        <div className="info-card p-4 rounded-4 mt-4">
          <h3 className="mb-3">Editar Evento</h3>

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
              className="form-control mb-2"
              value={editando.imagen}
              onChange={(e) => setEditando({ ...editando, imagen: e.target.value })}
              required
            />

            <input
              className="form-control mb-2"
              value={editando.fechaEvento}
              onChange={(e) => setEditando({ ...editando, fechaEvento: e.target.value })}
              required
            />

            <input
              className="form-control mb-3"
              value={editando.lugar}
              onChange={(e) => setEditando({ ...editando, lugar: e.target.value })}
              required
            />

            <button className="btn btn-primary w-100">Guardar cambios</button>
          </form>
        </div>
      )}

    </div>
  );
}
