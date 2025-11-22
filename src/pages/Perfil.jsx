import { useEffect, useState } from "react";
import { apiGet, apiPut, apiDelete } from "../utils/api";

export default function Perfil() {

  const [user, setUser] = useState(null);
  const [compras, setCompras] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // ===========================
  // CARGAR PERFIL
  // ===========================
  useEffect(() => {
    async function cargar() {
      try {
        const data = await apiGet("/auth/perfil");
        setUser(data);
      } catch {
        setError("No se pudo cargar el perfil");
      }
    }
    cargar();
  }, []);

  // ===========================
  // CARGAR COMPRAS
  // ===========================
  useEffect(() => {
    if (!user?.email) return;

    async function cargarCompras() {
      try {
        const data = await apiGet(`/compras/usuario/${user.email}`);
        setCompras(data);
      } catch { }
    }
    cargarCompras();
  }, [user]);

  // ===========================
  // ACTUALIZAR PERFIL
  // ===========================
  async function actualizarPerfil(e) {
    e.preventDefault();
    try {
      await apiPut(`/api/usuario/${user.email}`, user);
      setMensaje("Perfil actualizado ✔");
    } catch {
      setError("Error al actualizar perfil");
    }
  }

  // ===========================
  // CAMBIAR PASSWORD
  // ===========================
  async function cambiarPassword() {
    const nueva = document.getElementById("newPass").value;
    const repetir = document.getElementById("newPass2").value;

    if (nueva !== repetir)
      return alert("Las contraseñas no coinciden");

    try {
      await apiPut(`/api/usuario/${user.email}/password`, { nueva });
      alert("Contraseña cambiada ✔");
    } catch {
      alert("No se pudo cambiar contraseña ❌");
    }
  }

  // ===========================
  // ELIMINAR CUENTA
  // ===========================
  async function eliminarCuenta() {
    if (!confirm("❌ ¿Seguro?")) return;

    try {
      await apiDelete(`/api/usuario/${user.email}`);

      localStorage.clear();
      alert("Cuenta eliminada ✔");
      window.location.href = "/";
    } catch {
      alert("Error al eliminar cuenta ❌");
    }
  }

  if (!user) return <p className="text-light text-center mt-5">Cargando…</p>;

  return (
    <main className="container py-5">
      <h1 className="section-title mb-4">Mi Perfil</h1>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">

        {/* INFO IZQUIERDA */}
        <div className="col-lg-4">
          <div className="info-card p-3 bg-dark text-light rounded-4">
            <h5>Estado de cuenta</h5>
            <hr />

            <p><strong>Correo:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.rol}</p>

            <button className="btn btn-outline-light w-100 mt-3"
              onClick={() => document.getElementById("modalPass").showModal()}>
              Cambiar contraseña
            </button>

            <button className="btn btn-outline-danger w-100 mt-3"
              onClick={eliminarCuenta}>
              Eliminar cuenta
            </button>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="col-lg-8">
          <form onSubmit={actualizarPerfil}
            className="info-card p-4 bg-dark rounded-4">

            <h5>Actualizar Perfil</h5>

            <div className="row g-3">

              <div className="col-md-6">
                <label>Nombre</label>
                <input className="form-control"
                  value={user.nombre || ""}
                  onChange={e => setUser({ ...user, nombre: e.target.value })} />
              </div>

              <div className="col-md-6">
                <label>Apellido</label>
                <input className="form-control"
                  value={user.apellido || ""}
                  onChange={e => setUser({ ...user, apellido: e.target.value })} />
              </div>

              <div className="col-md-6">
                <label>Sexo</label>
                <select className="form-select"
                  value={user.sexo || ""}
                  onChange={e => setUser({ ...user, sexo: e.target.value })}>
                  <option value="">Seleccionar…</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Domicilio</label>
                <input className="form-control"
                  value={user.domicilio || ""}
                  onChange={e => setUser({ ...user, domicilio: e.target.value })} />
              </div>

              <div className="col-12 mt-3">
                <button className="btn btn-neon w-100">Guardar cambios</button>
              </div>

            </div>
          </form>
        </div>

      </div>

      {/* MODAL CAMBIO PASSWORD */}
      <dialog id="modalPass" className="p-4 rounded">
        <h4>Cambiar contraseña</h4>

        <input id="newPass" type="password" className="form-control mt-2"
          placeholder="Nueva contraseña" />

        <input id="newPass2" type="password" className="form-control mt-2"
          placeholder="Repetir contraseña" />

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-neon" onClick={cambiarPassword}>Guardar</button>
          <button className="btn btn-secondary"
            onClick={() => document.getElementById("modalPass").close()}>
            Cancelar
          </button>
        </div>
      </dialog>
    </main>
  );
}
