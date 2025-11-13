export default function Registro(){ return(
    <main>
        <main className="container py-5">
    <h1 className="section-title mb-4">Crea tu cuenta</h1>

    <form id="registerForm" className="info-card p-4 rounded-4 needs-validation" novalidate>
      
      <div id="formAlerts"></div>

      <div className="row g-3">
        
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input id="rName" className="form-control" required maxlength="100" placeholder="Tu nombre"></input>
          <div className="invalid-feedback">Campo obligatorio (máx. 100).</div>
        </div>

       
        <div className="col-md-6">
          <label className="form-label">Apellido</label>
          <input id="rLast" className="form-control" maxlength="100" placeholder="Tu apellido"></input>
        </div>

        
        <div className="col-12">
          <label className="form-label">Correo</label>
          <input
            id="rEmail"
            type="email"
            className="form-control"
            required
            maxlength="100"
            placeholder="tu@duoc.cl"
            pattern="^[^\s@]{1,100}@(?:duoc\.cl|profesor\.duoc\.cl|gmail\.com)$"></input>
          <div className="form-text">Permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com (máx. 100).</div>
          <div className="invalid-feedback">Correo inválido o dominio no permitido.</div>
        </div>

        
        <div className="col-md-6">
          <label className="form-label">Contraseña</label>
          <input id="rPass" type="password" className="form-control" required minlength="4" maxlength="10" placeholder="4 a 10 caracteres"></input>
          <div className="invalid-feedback">Debe tener entre 4 y 10 caracteres.</div>
        </div>

        
        <div className="col-md-6">
          <label className="form-label">Confirmar contraseña</label>
          <input id="rPass2" type="password" className="form-control" maxlength="10" placeholder="Repite la contraseña"></input>
          <div className="invalid-feedback">Las contraseñas no coinciden.</div>
        </div>

        
        <div className="col-12">
          <label className="form-label">Código de referido (opcional)</label>
          <input id="rRefCode" className="form-control" placeholder="Ej: ABC123"></input>
        </div>

        <div className="col-12">
          <label className="form-label">Preferencias (categorías favoritas)</label>
          <input id="rPrefs" className="form-control" placeholder="Consolas, Mouse, Sillas..."></input>
        </div>

        <div className="col-12 d-grid d-md-flex gap-2">
          <button className="btn btn-neon" type="submit">Crear cuenta</button>
          <a className="btn btn-outline-neon" href="/login">Ya tengo cuenta</a>
        </div>
      </div>
    </form>
  </main>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script type="module" src="JS/main.js"></script>

  
  
    </main>
)}