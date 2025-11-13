import { useState } from "react";
import torneoLolImg from "../assets/img/eventos/lol.jpg";
import smashImg from "../assets/img/eventos/smash.jpg";
import lanzamientoImg from "../assets/img/eventos/dragonballsparkin.png";

export default function Eventos() { 
  
  const [eventos] = useState([
    {
      id: 1,
      titulo: "Torneo League of Legends - SoloQ 1v1",
      fecha: "30 Octubre 2025",
      lugar: "Sede Duoc UC Maipú",
      banner: torneoLolImg,
      desc: "Demuestra tu mecánica individual en duelos 1v1. Premios en periféricos RGB."
    },
    {
      id: 2,
      titulo: "Smash Bros Ultimate - Community Night",
      fecha: "2 Noviembre 2025",
      lugar: "LEVEL-UP Store (Local 12, Mall Arauco)",
      banner: smashImg,
      desc: "Bracket doble eliminación, pantalla gigante y narrador en vivo."
    },
    {
      id: 3,
      titulo: "Lanzamiento Dragon Ball: Sparking Zero",
      fecha: "5 Noviembre 2025",
      lugar: "Streaming Twitch oficial",
      banner: lanzamientoImg,
      desc: "Early access, sorteos de steelbook, y juego libre en consolas PS5."
    }
  ]);

  return (
    <main className="container py-4">
      <h1 className="section-title mb-4">Eventos</h1>

      <div className="row g-4">
        {eventos.map(ev => (
          <div key={ev.id} className="col-12 col-md-6 col-lg-4">
            <div className="p-3 bg-dark text-light rounded-4 h-100 d-flex flex-column">
              <img
                src={ev.banner}
                alt={ev.titulo}
                className="img-fluid rounded-3 mb-3"
              />
              <h2 className="h5">{ev.titulo}</h2>
              <p className="small mb-1"><strong>Fecha:</strong> {ev.fecha}</p>
              <p className="small mb-1"><strong>Lugar:</strong> {ev.lugar}</p>
              <p className="small flex-grow-1">{ev.desc}</p>
              <button className="btn btn-outline-light btn-sm w-100 mt-2">
                Me interesa
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
)}