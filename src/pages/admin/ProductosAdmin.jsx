import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/productos/listar", config)
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err));
  }, []);

  async function eliminar(id) {
    if (!confirm("¿Eliminar este producto?")) return;

    await axios.delete(
      `http://localhost:8080/productos/eliminar/${id}`,
      config
    );

    setProductos(productos.filter((p) => p.id !== id));
  }

  // FILTRO DE BÚSQUEDA
  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h1 className="section-title mb-4 text-center">
        Administrar Productos 🛠️
      </h1>

      {/* BUSCADOR */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar por nombre o categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <a href="/admin-panel/productos/crear" className="btn btn-neon ms-3">
          + Crear nuevo producto
        </a>
      </div>

      {/* TABLA MODERNA */}
      <div className="table-responsive">
        <table className="table table-dark table-hover table-admin align-middle rounded-4 overflow-hidden">
          <thead className="table-header-neon">
            <tr>
              <th>IMG</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-light">
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              filtrados.map((p) => (
                <tr key={p.id} className="fila-neon-hover">
                  <td>
                    <img
                      src={p.imagen}
                      alt="img"
                      style={{
                        width: "55px",
                        height: "55px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "2px solid #00ffbf",
                      }}
                    />
                  </td>
                  <td>{p.id}</td>
                  <td className="fw-bold">{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>${p.precio.toLocaleString("es-CL")}</td>

                  <td className="text-center">
                    <a
                      href={`/admin-panel/productos/editar/${p.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Editar
                    </a>

                    <button
                      onClick={() => eliminar(p.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}