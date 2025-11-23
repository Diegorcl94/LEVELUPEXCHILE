import { useState } from "react";
import { apiPost } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    setError("");

    const res = await apiPost("/auth/login", { email, password });

    if (res.error) {
      setError("Credenciales inválidas");
      return;
    }

    // GUARDAR TOKEN + ROL + EMAIL
    localStorage.setItem("token", res.token);
    localStorage.setItem("rol", res.rol);
    localStorage.setItem("email", res.email);

    // ADMIN → PANEL
    if (res.rol === "ROLE_ADMIN") {
      navigate("/admin-panel");
      return;
    }

    // USUARIO NORMAL
    navigate("/perfil");
  }

  return (
    <div className="container text-light py-5">

      <h2 className="mb-4">Iniciar sesión</h2>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <input
        className="form-control mb-2"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-neon w-100" onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
}
