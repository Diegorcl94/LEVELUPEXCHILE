import { useEffect, useState } from "react";
import { apiGet, apiPut, apiDelete } from "../utils/api";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [compras, setCompras] = useState([]);

  // ============================
  // CARGAR PERFIL
  // ============================
  useEffect(() => {
    async function cargarPerfil() {
      try {
        const data = await apiGet("/auth/perfil");
        setUser(data);
      } catch {
        setError("No se pudo cargar tu perfil");
      }
    }
    cargarPerfil();
  }, []);

  // ============================
  // CARGAR COMPRAS DEL USUARIO
  // ============================
  useEffect(() => {
    async function cargarCompras() {
      try {
        const email = user?.email;
        if (!email) return;
        const res = await apiGet(`/compras/usuario/${email}`);
        setCompras(res);
      } catch {
        console.log("Error al cargar compras");
      }
    }

    if (user) cargarCompras();
  }, [user]);

  // ============================
  // ACTUALIZAR PERFIL
  // ============================
  async function actualizarPerfil(e) {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const body = {
        nombre: user.nombre,
        apellido: user.apellido,
        sexo: user.sexo,
        domicilio: user.domicilio,
        fotoPerfil: user.fotoPerfil,
      };

      await apiPut("/usuarios/actualizar", body);
      setMensaje("Perfil actualizado con éxito ✔");
    } catch {
      setError("No se pudo actualizar el perfil");
    }
  }

  // ============================
  // CAMBIAR CONTRASEÑA
  // ============================
  async function cambiarPassword() {
    const nueva = document.getElementById("newPass").value;
    const repite = document.getElementById("newPass2").value;

    if (nueva !== repite) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await apiPut("/usuarios/cambiar-password", { password: nueva });
      alert("Contraseña cambiada con éxito ✔");
      document.getElementById("newPass").value = "";
      document.getElementById("newPass2").value = "";
    } catch {
      alert("Error al cambiar contraseña");
    }
  }

  // ============================
  // ELIMINAR CUENTA
  // ============================
  async function eliminarCuenta() {
    const seguro = confirm("😢 ¿Realmente quieres eliminar tu cuenta?");

    if (!seguro) return;

    try {
      await apiDelete("/usuarios/eliminar");
      localStorage.clear();
      alert("Cuenta eliminada correctamente");
      window.location.href = "/";
    } catch {
      alert("No se pudo eliminar la cuenta");
    }
  }

  // ============================
  // MOSTRAR CARGA
  // ============================
  if (!user) {
    return <p className="text-center mt-5 text-light">Cargando perfil...</p>;
  }

  // ============================
  // VISTA PRINCIPAL DEL PERFIL
  // ============================
  return (
    <main className="container py-5">
      <h1 className="section-title mb-4">Mi Perfil</h1>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-4">
        {/* INFORMACIÓN GENERAL */}
        <div className="col-lg-4">
          <div className="info-card p-3 rounded-4 bg-dark text-light">
            <h5>Estado de cuenta</h5>
            <hr />
            <p><strong>Correo:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.rol}</p>

            <button
              className="btn btn-outline-danger mt-3 w-100"
              onClick={eliminarCuenta}
            >
              Eliminar cuenta
            </button>

            <button
              className="btn btn-outline-light mt-3 w-100"
              onClick={() => document.getElementById("modalPass").showModal()}
            >
              Cambiar contraseña
            </button>
          </div>
        </div>

        {/* FORMULARIO DE PERFIL */}
        <div className="col-lg-8">
          <form onSubmit={actualizarPerfil} className="info-card p-4 rounded-4 bg-dark text-light">
            <h5>Actualizar Perfil</h5>
            <div className="row g-3 mt-2">

              <div className="col-md-6">
                <label>Nombre</label>
                <input
                  className="form-control"
                  value={user.nombre || ""}
                  onChange={(e) =>
                    setUser({ ...user, nombre: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label>Apellido</label>
                <input
                  className="form-control"
                  value={user.apellido || ""}
                  onChange={(e) =>
                    setUser({ ...user, apellido: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label>Sexo</label>
                <select
                  className="form-select"
                  value={user.sexo || ""}
                  onChange={(e) =>
                    setUser({ ...user, sexo: e.target.value })
                  }
                >
                  <option value="">Seleccionar…</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Domicilio</label>
                <input
                  className="form-control"
                  value={user.domicilio || ""}
                  onChange={(e) =>
                    setUser({ ...user, domicilio: e.target.value })
                  }
                />
              </div>

              <div className="col-12 mt-3">
                <button className="btn btn-neon w-100" type="submit">
                  Guardar cambios
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* ============================== */}
      {/* HISTORIAL DE COMPRAS */}
      {/* ============================== */}
      <div className="mt-5">
        <h2 className="section-title mb-3">Historial de compras 🛒</h2>

        {!compras || compras.length === 0 ? (
          <p className="text-light">Aún no has realizado compras.</p>
        ) : (
          <div className="row g-4">
            {compras.map((c, index) => {
              const productos = JSON.parse(c.productos);

              return (
                <div key={c.id} className="col-md-6">
                  <div className="compra-card neon-border p-4 rounded-4">
                    <h4 className="text-neon">Compra #{index + 1}</h4>

                    <p className="text-light mt-2">
                      <strong>Fecha:</strong> {new Date(c.fecha).toLocaleString("es-CL")}
                    </p>

                    <p className="text-light">
                      <strong>Total:</strong> ${c.total.toLocaleString("es-CL")}
                    </p>

                    <strong className="text-light mt-2">Productos:</strong>
                    <ul className="text-light mt-2">
                      {productos.map((p, i) => (
                        <li key={i}>🎮 {p.nombre} — ${p.precio.toLocaleString("es-CL")}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================== */}
      {/* MODAL CAMBIO CONTRASEÑA */}
      {/* =========================== */}
      <dialog id="modalPass" className="p-4 rounded">
        <h4>Cambiar contraseña</h4>
        <input
          id="newPass"
          type="password"
          className="form-control mt-2"
          placeholder="Nueva contraseña"
        />
        <input
          id="newPass2"
          type="password"
          className="form-control mt-2"
          placeholder="Repite la contraseña"
        />

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-neon" onClick={cambiarPassword}>
            Guardar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => document.getElementById("modalPass").close()}
          >
            Cancelar
          </button>
        </div>
      </dialog>
    </main>
  );
}