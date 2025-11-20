import { useState } from "react";
import { apiPost } from "../utils/api";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
    sexo: "",
    domicilio: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const body = {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        password: form.password,
        sexo: form.sexo,
        domicilio: form.domicilio,
        fotoPerfil: "",
        rol: "USER",
      };

      const data = await apiPost("/auth/register", body);

      // Guardar sesión automáticamente
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
          rol: data.rol,
        })
      );

      setSuccess("Cuenta creada correctamente ✔");

      setTimeout(() => {
        window.location.href = "/perfil";
      }, 1000);
    } catch (err) {
      setError("No se pudo registrar. El correo ya existe o el servidor no responde.");
    }
  }

  return (
    <main className="container py-5">
      <h1 className="section-title mb-4">Crear Cuenta</h1>

      <form onSubmit={handleRegister} className="info-card p-4 rounded-4">

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              name="nombre"
              className="form-control"
              required
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Apellido</label>
            <input
              name="apellido"
              className="form-control"
              required
              value={form.apellido}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Correo</label>
            <input
              name="email"
              type="email"
              className="form-control"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contraseña</label>
            <input
              name="password"
              type="password"
              className="form-control"
              required
              minLength="4"
              maxLength="10"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              name="password2"
              type="password"
              className="form-control"
              required
              minLength="4"
              maxLength="10"
              value={form.password2}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Sexo</label>
            <select
              name="sexo"
              className="form-select"
              value={form.sexo}
              onChange={handleChange}
            >
              <option value="">Seleccione...</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Domicilio</label>
            <input
              name="domicilio"
              className="form-control"
              value={form.domicilio}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 d-grid d-md-flex gap-2 mt-3">
            <button className="btn btn-neon" type="submit">
              Crear cuenta
            </button>
            <a className="btn btn-outline-neon" href="/login">
              Ya tengo cuenta
            </a>
          </div>
        </div>
      </form>
    </main>
  );
}