import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../../utils/api";

export default function BannerAdmin() {

  const [banners, setBanners] = useState([]);

  const [form, setForm] = useState({
    imagen: "",
    titulo: "",
    descripcion: "",
    enlace: "",
    orden: 1,
    activo: true
  });

  const [editId, setEditId] = useState(null);

  // =============================
  // CARGAR BANNERS
  // =============================  
  async function cargar() {
    const data = await apiGet("/banners/listar");
    setBanners(data);
  }

  useEffect(() => {
    cargar();
  }, []);

  // =============================
  // HANDLER CAMBIO DE FORMULARIO
  // =============================
  function handleChange(e) {
    const { name, value } = e.target;

    // Si el campo es número → convertir
    if (name === "orden") {
      setForm({ ...form, orden: Number(value) });
    }
    // Si el campo es boolean → convertir
    else if (name === "activo") {
      setForm({ ...form, activo: value === "true" });
    }
    else {
      setForm({ ...form, [name]: value });
    }
  }

  // =============================
  // CREAR BANNER
  // =============================
  async function crearBanner() {
    await apiPost("/banners/crear", {
      ...form,
      orden: Number(form.orden),
      activo: Boolean(form.activo)
    });

    setForm({
      imagen: "",
      titulo: "",
      descripcion: "",
      enlace: "",
      orden: 1,
      activo: true
    });

    cargar();
  }

  // =============================
  // ELIMINAR
  // =============================
  async function eliminar(id) {
    await apiDelete(`/banners/eliminar/${id}`);
    cargar();
  }

  // =============================
  // EDITAR — CARGAR FORM
  // =============================
  function openEdit(banner) {
    setEditId(banner.id);
    setForm({
      imagen: banner.imagen,
      titulo: banner.titulo,
      descripcion: banner.descripcion,
      enlace: banner.enlace || "",
      orden: banner.orden,
      activo: banner.activo
    });
  }

  // =============================
  // GUARDAR EDICIÓN
  // =============================
  async function guardarEdit() {
    await apiPut(`/banners/editar/${editId}`, {
      ...form,
      orden: Number(form.orden),
      activo: Boolean(form.activo)
    });

    setEditId(null);
    setForm({
      imagen: "",
      titulo: "",
      descripcion: "",
      enlace: "",
      orden: 1,
      activo: true
    });

    cargar();
  }

  return (
    <div className="container py-4 text-light">
      <h2 className="mb-4">Administrar Banners</h2>

      {/* FORMUARIO */}
      <div className="bg-dark p-4 rounded-4 border border-success mb-4">

        <h5>{editId ? "Editar banner" : "Crear nuevo banner"}</h5>

        <input
          className="form-control my-2"
          placeholder="URL imagen"
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
        />

        <input
          className="form-control my-2"
          placeholder="Título"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
        />

        <input
          className="form-control my-2"
          placeholder="Descripción"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />

        <input
          className="form-control my-2"
          placeholder="Enlace (producto, categoría, blog, evento o URL)"
          name="enlace"
          value={form.enlace}
          onChange={handleChange}
        />

        <input
          className="form-control my-2"
          type="number"
          placeholder="Orden"
          name="orden"
          value={form.orden}
          onChange={handleChange}
        />

        <select
          className="form-select my-2"
          name="activo"
          value={form.activo}
          onChange={handleChange}
        >
          <option value={true}>Activo</option>
          <option value={false}>Inactivo</option>
        </select>

        {editId ? (
          <button className="btn btn-warning w-100 mt-3" onClick={guardarEdit}>
            Guardar cambios
          </button>
        ) : (
          <button className="btn btn-neon w-100 mt-3" onClick={crearBanner}>
            Crear Banner
          </button>
        )}
      </div>

      {/* LISTADO */}
      <h4 className="mb-3">Banners creados</h4>

      <div className="row g-3">
        {banners.map((b) => (
          <div key={b.id} className="col-12 col-md-6 col-lg-4">

            <div className="p-3 bg-dark border border-secondary rounded-4 h-100">
              <img
                src={b.imagen}
                className="img-fluid rounded mb-2"
                style={{ height: "160px", objectFit: "cover" }}
              />

              <h5>{b.titulo}</h5>
              <p className="small text-secondary">{b.descripcion}</p>

              {b.enlace && (
                <p className="small text-info">
                  <strong>Enlace:</strong> {b.enlace}
                </p>
              )}

              <p className="small">
                <strong>Orden:</strong> {b.orden} <br />
                <strong>Activo:</strong> {b.activo ? "Sí" : "No"}
              </p>

              <button
                className="btn btn-warning btn-sm w-100 mb-2"
                onClick={() => openEdit(b)}
              >
                Editar
              </button>

              <button
                className="btn btn-danger btn-sm w-100"
                onClick={() => eliminar(b.id)}
              >
                Eliminar
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
