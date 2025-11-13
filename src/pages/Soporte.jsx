export default function Soporte(){ return(
    <main>
        <main className="container py-5">
    <h1 className="section-title mb-4">Soporte Técnico</h1>

    <div className="info-card p-4 rounded-4 mb-4">
      <h5 className="mb-2">¿Necesitas reparación?</h5>
      <p className="mb-0">
        <strong>¿Tienes tu consola o PC en mal estado y necesitas arreglo?</strong> Escríbenos y te contactamos a la brevedad.
      </p>
    </div>

    <div className="row g-4">
      <div className="col-md-6">
        <div className="info-card p-4 rounded-4">
          <h5 className="mb-3">Contáctanos</h5>

          <div id="supportNotice" className="alert alert-success d-none" role="alert">
            <i className="bi bi-check-circle-fill"></i>
            ¡Gracias! Hemos recibido tu solicitud. Te contactaremos a la brevedad.
          </div>

          <form id="supportForm" className="needs-validation" novalidate>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" id="name" className="form-control form-control--light" placeholder="Tu nombre" required></input>
              <div className="invalid-feedback">Ingresa tu nombre.</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input type="email" id="email" className="form-control form-control--light" placeholder="tucorreo@ejemplo.com" required></input>
              <div className="invalid-feedback">Ingresa un correo válido.</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea id="message" className="form-control form-control--light" rows="4" placeholder="Cuéntanos el problema" required></textarea>
              <div className="invalid-feedback">Escribe tu mensaje.</div>
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-neon" type="submit">
                <i className="bi bi-send"></i> Enviar
              </button>
              <button className="btn btn-outline-neon" type="button" id="btnVolver">
                <i className="bi bi-arrow-left"></i> Volver
              </button>
            </div>
          </form>
        </div>
      </div>

      
      <div className="col-md-6">
        <div className="card p-4 h-100">
          <h5 className="mb-3">Horarios y canales</h5>
          <ul className="mb-0">
            <li>Atención: Lun a Vie 10:00–18:00</li>
            <li>WhatsApp: +56 9 1234 5678</li>
            <li>Correo: soporte@levelup.cl</li>
          </ul>
        </div>
      </div>
    </div>
  </main>
    </main>
)}