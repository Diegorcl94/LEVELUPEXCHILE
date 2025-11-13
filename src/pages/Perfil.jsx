export default function Perfil(){ return(
    <main>
        <main className="container py-5">
    <h1 className="section-title mb-4">Mi Perfil</h1>
    <div className="row g-4">
      <div className="col-lg-4">
        <div className="info-card p-3 rounded-4">
          <h5>Estado de cuenta</h5>
          <div className="small">Correo: <span id="pfEmail"></span></div>
          <div className="small">Descuento Duoc: <span id="pfDuoc" className="text-neon"></span></div>
          <div className="small">Puntos LevelUp: <span id="pfPoints" className="text-neon fw-bold"></span></div>
          <div className="small">Nivel: <span id="pfLevel" className="fw-bold"></span></div>
          <div className="mt-2">Tu código de referidos: <code id="pfRefCode"></code>
            <button className="btn btn-sm btn-outline-neon share-btn" data-title="Únete a LevelUp" id="btnShareRef">Compartir</button>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <form id="profileForm" className="info-card p-4 rounded-4">
          <h5>Actualizar información</h5>
          <div className="row g-3">
            <div className="col-md-6"><label className="form-label">Nombre</label><input id="pfName" className="form-control"></input></div>
            <div className="col-md-6"><label className="form-label">Preferencias</label><input id="pfPrefs" className="form-control" placeholder="Consolas, Mouse..."></input></div>
            <div className="col-12"><label className="form-label">Dirección de envío</label><input id="pfAddress" className="form-control"></input></div>
          </div>
          <div className="d-grid d-md-flex gap-2 mt-3"><button className="btn btn-neon" type="submit">Guardar cambios</button></div>
        </form>
      </div>
    </div>
  </main>
    </main>
) }