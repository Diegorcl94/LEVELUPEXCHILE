import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../../utils/api";

export default function BannerAdmin() {

  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({
    imagen: "",
    titulo: "",
    descripcion: "",
    enlace: "",
    orden: "1",
    activo: true
  });

  const [editId, setEditId] = useState(null);

  // ============================
  // CARGAR BANNERS
  // ============================
  async function cargarBanners() {
    const data = await apiGet("/banners/listar");
    setBanners(data);
  }

  useEffect(() => {
    cargarBanners();
  }, []);

  // ============================
  // HANDLE CHANGE
  // ============================
  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "activo") {
      setForm({ ...form, activo: value === "true" });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  // ============================
  // CREAR BANNER
  // ============================
  async function crearBanner() {
    const body = {
      ...form,
      orden: Number(form.orden),
      activo: form.activo === true
    };

    await apiPost("/banners/crear", body);
    setForm({ imagen: "", titulo: "", descripcion: "", enlace: "", orden: "1", activo: true });
    cargarBanners();
    alert("Banner creado correctamente");
  }

  // ============================
  // GUARDAR EDICIÓN
  // ============================
  async function guardarEdit() {
    const body = {
      ...form,
      orden: Number(form.orden),
      activo: form.activo === true
    };

    await apiPut(`/banners/editar/${editId}`, body);
    setEditId(null);
    setForm({ imagen: "", titulo: "", descripcion: "", enlace: "", orden: "1", activo: true });
    cargarBanners();
    alert("Banner actualizado");
  }

  // ============================
  // CARGAR DATOS EN FORMULARIO
  // ============================
  function cargarParaEditar(b) {
    setEditId(b.id);
    setForm({
      imagen: b.imagen,
      titulo: b.titulo,
      descripcion: b.descripcion,
      enlace: b.enlace,
      orden: String(b.orden),
      activo: b.activo
    });
  }

  // ============================
  // ELIMINAR BANNER
  // ============================
  async function eliminarBanner(id) {
    if (!confirm("¿Seguro que quieres eliminar este banner?")) return;
    await apiDelete(`/banners/eliminar/${id}`);
    cargarBanners();
  }

  // ============================
  // RENDER
  // ============================
  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">Administrar Banners</h2>

      <div className="card p-4">

        <input className="form-control my-2" name="imagen" placeholder="URL imagen"
          value={form.imagen} onChange={handleChange} />

        <input className="form-control my-2" name="titulo" placeholder="Título"
          value={form.titulo} onChange={handleChange} />

        <input className="form-control my-2" name="descripcion" placeholder="Descripción"
          value={form.descripcion} onChange={handleChange} />

        <input className="form-control my-2" name="enlace" placeholder="Enlace"
          value={form.enlace} onChange={handleChange} />

        <input className="form-control my-2" name="orden" placeholder="Orden"
          value={form.orden} onChange={handleChange} />

        {/* SELECT ACTIVO/INACTIVO */}
        <select
          className="form-select my-2"
          name="activo"
          value={form.activo ? "true" : "false"}
          onChange={handleChange}
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>

        {!editId ? (
          <button className="btn btn-success mt-2" onClick={crearBanner}>Crear Banner</button>
        ) : (
          <button className="btn btn-primary mt-2" onClick={guardarEdit}>Guardar Cambios</button>
        )}

      </div>

      <hr />

      <h3>Listado de Banners</h3>

      <ul className="list-group mt-3">
        {banners.map(b => (
          <li
            key={b.id}
            className="list-group-item banners-list-card d-flex justify-content-between align-items-center mb-2"
          >
            <div>
              <b>{b.titulo}</b>
              <span> — Orden {b.orden} — </span>

              <span className="badge">
                {b.activo ? "Activo" : "Inactivo"}
              </span>
            </div>

            <div>
              <button
                className="btn btn-warning btn-sm mx-1"
                onClick={() => cargarParaEditar(b)}
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminarBanner(b.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}
