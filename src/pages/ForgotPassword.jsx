import { useState } from "react";
import { apiPost } from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const data = await apiPost("/auth/forgot-password", { email });

      // El backend siempre responde igual por seguridad
      setMsg("Si el correo existe, enviaremos instrucciones a tu email ✔");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  }

  return (
    <main className="container py-5">
      <h1 className="section-title mb-4">Recuperar contraseña</h1>

      <form className="info-card p-4 rounded-4" onSubmit={handleSubmit}>
        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <label className="form-label">Ingresa tu correo</label>
        <input
          className="form-control"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-neon w-100 mt-4">Enviar instrucciones</button>

        <div className="mt-3 text-center">
          <a href="/login" className="text-neon">Volver al login</a>
        </div>
      </form>
    </main>
  );
}