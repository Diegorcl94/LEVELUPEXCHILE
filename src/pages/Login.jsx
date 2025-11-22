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
      const data = await apiPost("/auth/login", { email, password });

      if (!data.token) {
        setError("Credenciales incorrectas");
        return;
      }

      // 🔥 GUARDAR TOKEN CORRECTAMENTE
      localStorage.setItem("token", data.token);

      // 🔥 GUARDAR EMAIL Y ROL
      localStorage.setItem("email", data.email);
      localStorage.setItem("rol", data.rol);

      // 🔥 REDIRECCIÓN
      if (data.rol === "ADMIN") {
        window.location.href = "/admin-panel";
      } else {
        window.location.href = "/perfil";
      }

    } catch {
      setError("Correo o contraseña inválida");
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

      </form>
    </main>
  );
}
