import { useParams } from "react-router-dom";
import nintendodirect from '../assets/img/nintendodirect.jpg'
import hollow from '../assets/img/Hollow.jpg'
import fc26 from '../assets/img/fc26.jpeg'
import entel from '../assets/img/entel.jpg'
import lenovo from '../assets/img/lenovo.png'
import fortnite from '../assets/img/fornite.jpg'
import duocuc from '../assets/img/duocucpromo.png'
import pokemon from '../assets/img/pokemoncard.jpeg'
import teclado from '../assets/img/teclado.jpg'

export default function BlogPost() {
  const { id } = useParams();

  const postsMap = {

    "1": { title: "Nintendo Direct 2025: horarios y qué esperar", body: "Parece que tenemos una nueva pista del siguiente Nintendo Direct. Los rumores de Direct en junio se desinflaron, pero luego tuvimos un Donkey Kong Bananza Direct. El caso es que hace poco se reavivaron para julio de 2025 con posibles juegos de un Direct general.", banner: nintendodirect },
    "2": { title: "Con todo el nuevo contenido de Hollow Knight: Silksong", body: "¡Parece que ha causado bastantes reacciones el debut de Hollow Knight: Silksong! Recordad que hace poco también recibimos gameplay del juego corriendo en Switch 2, y luego supimos que el anuncio especial era que el juego iba a lanzar el 4 de septiembre de 2025 en todas las plataformas, incluyendo Switch y Switch 2.", banner: hollow },
    "3": { title: "Nuevas jugabilidades en FC 26", body: "¡Parece que ha causado bastantes reacciones el debut de FC 26! Recordad que hace poco también recibimos gameplay del juego corriendo en Switch 2, y luego supimos que el anuncio especial era que el juego iba a lanzar el 4 de septiembre de 2025 en todas las plataformas, incluyendo Switch y Switch 2.", banner: fc26 },
    "4": { title: "Chile está a un paso de habilitar la conexión móvil satelital: así funcionará la alianza de Entel y Starlink", body: "Pronto, los chilenos se familiarizarán con un nuevo ícono en sus celulares: el de un satélite, el que reemplazará por momentos al clásico ‘4G’, ‘LTE’ o ‘5G’ que vemos en nuestras pantallas. Y seremos los primeros en América Latina. Chile se encuentra en pleno proceso de validación de una normativa que habilitará la oferta masiva de la conexión satelital en teléfonos inteligentes, una vez que los operadores lo implementen. Y hasta ahora, la única firma preparada es Entel, que logró una alianza con Starlink para ofrecerlo en sus planes.", banner: entel },
    "5": { title: "Lenovo ataca el sector Gaming en IFA 2025 con el lanzamiento de Legion Go 2, un PC Gamer portátil con controladores desacoplables", body: "Este dispositivo, que vió la luz por primera vez en forma de prototipo en el CES de 2025, es la respuesta de Lenovo a la Switch 2, un equipo portátil pero con toda la potencia de un pc gaming para que no haya que realizar compromisos entre la potencia y la portabilidad. La nueva Legion Go 2 da continuidad al éxito de la primera generación manteniendo el ADN del modelo original pero incorporando mejoras clave en base a las aportaciones de los fans, como la inclusión de unos controladores desacoplables y mayores opciones de personalización.", banner: lenovo },
    "6": { title: "Pasa de nivel en Fortnite más rápido con estos mapas secretos", body: "Estos son algunos de los mapas más efectivos para farmear experiencia en Fortnite: 0875-1712-8130 mapa de parkour: Este mapa de parkour es ideal para mejorar tus habilidades de salto y agilidad mientras", banner: fortnite },
    "7": { title: "APROVECHA EL DESCUENTO SOLO POR SER ALUMNO DUOC", body: "Aprovhecha el DESCUENTO en toda la tienda solo registrando tu correo duoc uc.", banner: duocuc },
    "8": { title: "Tips para elegir tu primer mazo pokemon", body: "Elegir tu primer mazo de Pokémon puede ser una tarea abrumadora, especialmente con tantas opciones disponibles. Aquí hay algunos consejos para ayudarte a tomar la mejor decisión: 1. Conoce las reglas: Antes de elegir un mazo, asegúrate de entender las reglas básicas del juego. Esto te ayudará a identificar qué cartas son más útiles para tu estrategia. 2. Elige un tipo de Pokémon: Los mazos suelen centrarse en un tipo específico de Pokémon (agua, fuego, planta, etc.). Elige un tipo que te guste y que tenga buenas sinergias entre las cartas. 3. Considera la jugabilidad: Algunos mazos son más fáciles de jugar que otros. Si eres principiante, busca mazos que sean sencillos y que no requieran combinaciones complicadas de cartas. 4. Prueba diferentes mazos: No tengas miedo de experimentar con diferentes mazos y estrategias. Esto te ayudará a encontrar el estilo de juego que más te guste. 5. Aprende de la comunidad: Únete a grupos de jugadores de Pokémon y aprende de sus experiencias. Pueden ofrecerte valiosos consejos y recomendaciones sobre mazos. Recuerda que lo más importante es divertirte mientras juegas. ¡Buena suerte!", banner: pokemon },
    "9": { title: "Cómo elegir tu primer teclado mecánico", body: "Cómo Elegir el Mejor Teclado Mecánico para tu Estilo de Juego. Ahora que conoces las diferencias clave, aquí tienes algunos consejos para tomar la mejor decisión: Evalúa tu Estilo de Juego: Considera qué géneros juegas más y qué características necesitas. Un jugador de FPS podría preferir switches lineales y un diseño TKL, mientras que un jugador de MMO podría beneficiarse de switches táctiles y teclas programables. Considera tu Espacio: Si tienes un escritorio grande, un teclado full-size podría ser ideal. Si no, un TKL o compacto puede ser más conveniente. Prueba Antes de Comprar: Si es posible, prueba diferentes tipos de switches para sentir cuál es más cómodo para ti. Piensa en el Futuro: Considera la durabilidad y las opciones de personalización a largo plazo, como la facilidad de reemplazar keycaps o switches.", banner: teclado },

  };

  const post = postsMap[id];

  if (!post) {
    return (
      <main className="container py-4 text-light">
        <h1>Post no encontrado</h1>
      </main>
    );
  }

  return (
    <main className="container py-4 text-light">
      <img src={post.banner} alt={post.title} className="img-fluid rounded-4 mb-3" />
      <h1 className="section-title mb-3">{post.title}</h1>
      <p className="fs-5">{post.body}</p>
    </main>
  );
}
