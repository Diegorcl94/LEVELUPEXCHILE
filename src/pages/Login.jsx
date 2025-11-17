import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Credenciales incorrectas");
        return;
      }

      const data = await res.json();

      // Guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.usuario));

      window.location.href = "/perfil";
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <main className="container py-5">
      <h1 className="section-title mb-4">Iniciar sesión</h1>

      <form className="info-card p-4 rounded-4" onSubmit={handleLogin}>
        {error && <div className="alert alert-danger">{error}</div>}

        <label className="form-label">Correo</label>
        <input className="form-control"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label className="form-label mt-3">Contraseña</label>
        <input className="form-control"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn btn-neon mt-4 w-100">
          Iniciar sesión
        </button>
      </form>
    </main>
  );
}