export default function Login(){ return(
    <main>
        <main className="d-flex align-items-center justify-content-center min-vh-100">
    <div className="container">
      <form id="loginForm" className="info-card p-4 rounded-4 needs-validation" novalidate>
        <h1 className="section-title mb-4 text-center">Iniciar Sesión</h1>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" id="email" className="form-control form-control-lg" required></input>
          <div className="invalid-feedback">Ingresa un correo válido.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" id="password" className="form-control form-control-lg" minlength="6" required></input>
          <div className="invalid-feedback">Mínimo 6 caracteres.</div>
        </div>

        <div className="d-grid gap-2">
          <button className="btn btn-neon btn-lg" type="submit">Entrar</button>
          <a className="btn btn-outline-neon" href="/registro">Crear cuenta</a>
        </div>
      </form>
    </div>
  </main>
    </main>
) }