import nintendodirect from '../assets/img/nintendodirect.jpg'
import hollow from '../assets/img/Hollow.jpg'
import fc26 from '../assets/img/fc26.jpeg'
import entel from '../assets/img/entel.jpg'
import lenovo from '../assets/img/lenovo.png'
import fortnite from '../assets/img/fornite.jpg'
import duocuc from '../assets/img/duocucpromo.png'
import pokemon from '../assets/img/pokemoncard.jpeg'
import teclado from '../assets/img/teclado.jpg'
import { Link } from "react-router-dom";


export default function Blog() { 
  
  const posts = [
    { id: 1, title: "Nintendo Direct 2025: horarios y qué esperar", img: nintendodirect },
    { id: 2, title: "Con todo el nuevo contenido de Hollow Knight: Silksong", img: hollow },
    { id: 3, title: "Nuevas jugabilidades en FC 26", img: fc26 },
    { id: 4, title: "Chile está a un paso de habilitar la conexión móvil satelital: así funcionará la alianza de Entel y Starlink", img: entel },
    { id: 5, title: "Lenovo ataca el sector Gaming en IFA 2025 con el lanzamiento de Legion Go 2, un PC Gamer portátil con controladores desacoplables", img: lenovo },
    { id: 6, title: "Pasa de nivel en Fortnite más rápido con estos mapas secretos", img: fortnite },
    { id: 7, title: "APROVECHA EL DESCUENTO SOLO POR SER ALUMNO DUOC", img: duocuc },
    { id: 8, title: "Tips para elegir tu primer mazo pokemon", img: pokemon },
    { id: 9, title: "Cómo elegir tu primer teclado mecánico", img: teclado },
  ];
  
  return (

    <main className="container py-4">
      <h1 className="section-title mb-4">Blog</h1>

      <div className="row g-4">
        {posts.map(p => (
          <div key={p.id} className="col-12 col-md-6">
            <div className="p-3 bg-dark text-light rounded-4 h-100">
              <img src={p.img} alt={p.title} className="img-fluid rounded-3 mb-2" />
              <h2 className="h5">{p.title}</h2>
              <Link className="btn btn-outline-light btn-sm mt-2" to={`/blog/${p.id}`}>
                Leer más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
); }