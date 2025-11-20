import { useState } from "react";
import axios from "axios";

export default function CrearProducto() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    precio: "",
    categoria: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validarFormulario() {
    if (!form.nombre) return "El nombre es obligatorio";
    if (!form.descripcion) return "La descripción es obligatoria";
    if (!form.precio || form.precio <= 0) return "El precio debe ser válido";
    if (!form.categoria) return "Debes seleccionar una categoría";
    return null;
  }

  async function guardar(e) {
    e.preventDefault();
    setMensaje("");
    setError("");

    const error = validarFormulario();
    if (error) {
      setError(error);
      return;
    }

    try {
      await axios.post("http://localhost:8080/productos/crear", form, config);

      setMensaje("Producto agregado con éxito ✔");

      setTimeout(() => {
        window.location.href = "/admin-panel/productos";
      }, 1500);
    } catch (err) {
      setError("Error al crear el producto");
    }
  }

  return (
    <div className="container py-5">
      <h1 className="section-title">Crear Producto</h1>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="info-card p-4 rounded-4" onSubmit={guardar}>

        {/* NOMBRE */}
        <label className="mt-2">Nombre</label>
        <input
          className="form-control"
          name="nombre"
          placeholder="Nombre del producto"
          onChange={handleChange}
        />

        {/* DESCRIPCIÓN */}
        <label className="mt-3">Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          placeholder="Descripción del producto"
          rows={3}
          onChange={handleChange}
        />

        {/* IMAGEN */}
        <label className="mt-3">URL de imagen</label>
        <input
          className="form-control"
          name="imagen"
          placeholder="Ej: https://imagen.png"
          onChange={handleChange}
        />

        {/* PRECIO */}
        <label className="mt-3">Precio</label>
        <input
          className="form-control"
          name="precio"
          type="number"
          placeholder="Ej: 19990"
          onChange={handleChange}
        />

        {/* CATEGORÍA COMO COMBOBOX */}
        <label className="mt-3">Categoría</label>
        <select
          className="form-select"
          name="categoria"
          onChange={handleChange}
        >
          <option value="">Seleccionar categoría...</option>
          <option value="nintendo">Nintendo</option>
          <option value="ps5">PS5</option>
          <option value="pc">PC</option>
          <option value="clasicos">Clásicos</option>
          <option value="silla gamer">Silla gamer</option>
          <option value="poleras">Poleras</option>
          <option value="articulo pc">Artículos PC</option>
        </select>

        <button className="btn btn-success w-100 mt-4">
          Guardar producto
        </button>

        <a href="/admin-panel" className="btn btn-secondary w-100 mt-3">
          Volver al Panel Admin
        </a>
      </form>
    </div>
  );
}