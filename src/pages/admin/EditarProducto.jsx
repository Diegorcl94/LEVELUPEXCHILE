import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditarProducto() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // --- CARGAR PRODUCTO ---
  useEffect(() => {
    axios
      .get("http://localhost:8080/productos/listar", config)
      .then((res) => {
        const prod = res.data.find((p) => p.id == id);
        setForm(prod);
      })
      .catch(() => setError("No se pudo cargar el producto"));
  }, [id]);

  // --- MANEJAR CAMBIOS ---
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // --- VALIDACIÓN ---
  function validar() {
    if (!form.nombre) return "El nombre es obligatorio";
    if (!form.descripcion) return "La descripción es obligatoria";
    if (!form.precio || form.precio <= 0) return "El precio debe ser válido";
    if (!form.categoria) return "Debes seleccionar una categoría";
    return null;
  }

  // --- GUARDAR ---
  async function guardar(e) {
    e.preventDefault();
    setMensaje("");
    setError("");

    const valida = validar();
    if (valida) {
      setError(valida);
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/productos/editar/${id}`,
        form,
        config
      );

      setMensaje("Producto actualizado con éxito ✔");

      setTimeout(() => {
        window.location.href = "/admin-panel/productos";
      }, 1500);

    } catch {
      setError("Error al actualizar el producto");
    }
  }

  if (!form) return <p className="container py-5 text-light">Cargando...</p>;

  return (
    <div className="container py-5">
      <h1 className="section-title">Editar Producto</h1>

      {/* MENSAJES */}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="info-card p-4 rounded-4" onSubmit={guardar}>

        {/* NOMBRE */}
        <label className="mt-2">Nombre</label>
        <input
          className="form-control"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        {/* DESCRIPCIÓN */}
        <label className="mt-3">Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          rows={3}
          value={form.descripcion}
          onChange={handleChange}
        />

        {/* IMAGEN */}
        <label className="mt-3">URL de imagen</label>
        <input
          className="form-control"
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
        />

        {/* PREVIEW DE LA IMAGEN */}
        {form.imagen && (
          <div className="text-center mt-3">
            <img
              src={form.imagen}
              alt="Vista previa"
              className="img-thumbnail"
              style={{
                maxHeight: "200px",
                borderRadius: "10px",
                boxShadow: "0 0 15px rgba(0,255,150,0.4)"
              }}
            />
          </div>
        )}

        {/* PRECIO */}
        <label className="mt-3">Precio</label>
        <input
          className="form-control"
          name="precio"
          type="number"
          value={form.precio}
          onChange={handleChange}
        />

        {/* CATEGORÍA */}
        <label className="mt-3">Categoría</label>
        <select
          className="form-select"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        >
          <option value="nintendo">Nintendo</option>
          <option value="ps5">PS5</option>
          <option value="pc">PC</option>
          <option value="clasicos">Clásicos</option>
          <option value="silla gamer">Silla gamer</option>
          <option value="poleras">Poleras</option>
          <option value="articulo pc">Artículos PC</option>
        </select>

        {/* BOTONES */}
        <button className="btn btn-primary w-100 mt-4">
          Actualizar producto
        </button>

        <a href="/admin-panel/productos" className="btn btn-secondary w-100 mt-3">
          Volver
        </a>
      </form>
    </div>
  );
}