import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

export default function Eventos() {

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await apiGet("/eventos/listar");
      setEventos(data);
    }
    cargar();
  }, []);

  return (
    <main className="container py-4">
      <h1 className="section-title mb-4">Eventos</h1>

      {eventos.length === 0 && (
        <p className="text-secondary">No hay eventos disponibles.</p>
      )}

      <div className="row g-4">
        {eventos.map((ev) => (
          <div key={ev.id} className="col-12 col-md-6 col-lg-4">

            <div className="p-3 bg-dark text-light rounded-4 h-100 d-flex flex-column">
              
              {/* IMAGEN */}
              <img
                src={ev.imagen}
                alt={ev.titulo}
                className="img-fluid rounded-3 mb-3"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />

              {/* TÍTULO */}
              <h2 className="h5">{ev.titulo}</h2>

              {/* FECHA Y LUGAR */}
              <p className="small mb-1">
                <strong>Fecha:</strong> {ev.fechaEvento}
              </p>
              <p className="small mb-1">
                <strong>Lugar:</strong> {ev.lugar}
              </p>

              {/* DESCRIPCIÓN */}
              <p className="small flex-grow-1">{ev.descripcion}</p>

              <button className="btn btn-outline-light btn-sm w-100 mt-2">
                Me interesa
              </button>

            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
