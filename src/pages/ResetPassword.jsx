import { useState } from "react";
import { apiPut } from "../utils/api";

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setError("");

    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await apiPut("/auth/reset-password", {
        token,
        password
      });

      setMsg("Contraseña cambiada con éxito ✔");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (err) {
      setError("Token inválido o expirado");
    }
  }

  if (!token) {
    return (
      <main className="container py-5 text-light">
        <h3 className="text-danger">Token inválido</h3>
        <p>Este enlace no es válido.</p>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="section-title mb-4">Restablecer contraseña</h1>

      <form onSubmit={handleSubmit} className="info-card p-4 rounded-4">
        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <label className="form-label">Nueva contraseña</label>
        <input
          className="form-control"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="form-label mt-3">Repite la contraseña</label>
        <input
          className="form-control"
          type="password"
          required
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <button className="btn btn-neon w-100 mt-4">
          Cambiar contraseña
        </button>
      </form>
    </main>
  );
}