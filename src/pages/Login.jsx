import { useState } from "react";
import { apiPost } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await apiPost("/auth/login", {
        email,
        password,
      });

      // ================================
      // GUARDAR SESIÓN DE FORMA SEGURA
      // ================================
      localStorage.setItem("token", String(data.token)); // 🔥 FIX TOKEN
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
          rol: data.rol,
        })
      );

      // ================================
      // REDIRECCIÓN SEGÚN ROL
      // ================================
      if (data.rol === "ADMIN") {
        window.location.href = "/admin-panel";
      } else {
        window.location.href = "/perfil";
      }

    } catch (err) {
      console.error("Error login:", err);
      setError("Credenciales incorrectas o servidor no disponible");
    }
  }

  return (
    <main className="container py-5">
      <h1 className="section-title mb-4">Iniciar sesión</h1>

      <form className="info-card p-4 rounded-4" onSubmit={handleLogin}>
        {error && <div className="alert alert-danger">{error}</div>}

        <label className="form-label">Correo</label>
        <input
          className="form-control"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="form-label mt-3">Contraseña</label>
        <input
          className="form-control"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neon mt-4 w-100">Iniciar sesión</button>

        <div className="mt-3 text-center">
          <a href="/registro" className="text-neon">
            ¿No tienes cuenta? Regístrate aquí
          </a>
          <br />
          <a href="/recuperar" className="text-warning">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </main>
  );
}
