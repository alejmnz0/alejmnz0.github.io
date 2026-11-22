import type { Project } from './types';

/**
 * Projects shown in the Software Garage. Source: public repos of github.com/alejmnz0
 * (README, file tree, pom.xml / package.json / pubspec.yaml). Forks are excluded.
 *
 * To add a project: copy one object, give it a unique `id` + `plate`, and drop
 * screenshots in /public/projects (WebP, ~1280px wide). With no images, the card
 * renders generated cover art using `hue`.
 */
export const projects: Project[] = [
  {
    id: 'gestor-horas',
    name: 'Gestor de Horas',
    plate: 'AJ·01',
    year: 2026,
    category: 'Desktop',
    status: 'active',
    featured: true,
    tagline: 'Imputa tus horas en segundos. Un pequeño reloj te recuerda el resto.',
    description:
      'Aplicación de escritorio para Windows y Linux, ligera y 100 % local, para registrar el tiempo dedicado a cada proyecto. Incluye reloj flotante con recordatorios, histórico filtrable con exportación a Excel/CSV, rutinas, horarios por día y temporada, y tareas comunes repartidas entre proyectos.',
    problem:
      'Imputar horas a varios proyectos suele ser lento y se olvida. Gestor de Horas reduce el registro a unos clics en tramos de 15 minutos y recuerda imputar sin depender de servidores ni cuentas.',
    role: 'Proyecto personal: diseño, desarrollo, pruebas y empaquetado. En desarrollo activo (v1.4).',
    features: [
      'Imputación en tramos de 15 min, botón «Resto» y atajo Ctrl + Enter.',
      'Reloj flotante siempre visible con anillo de progreso y recordatorios configurables.',
      'Histórico tipo Excel con filtros, totales y exportación a .xlsx o CSV.',
      'Rutinas de tareas, horarios por día de la semana y de temporada.',
      'Tareas comunes con reparto proporcional o a partes iguales calculado como vista.',
      'Copia de seguridad diaria automática; sin nube ni telemetría.',
    ],
    architecture: {
      summary:
        'Electron con proceso principal y renderer aislados. La interfaz habla con el backend local solo a través de un puente IPC seguro.',
      layers: [
        { name: 'Renderer', detail: 'React 19 + Tailwind 4: páginas de imputación, histórico, proyectos y reloj flotante.' },
        { name: 'IPC seguro', detail: 'contextIsolation + sandbox, CSP estricta y verificación del origen de cada llamada.' },
        { name: 'Proceso principal', detail: 'Reglas de negocio y validación, planificador de recordatorios, bandeja y autoinicio.' },
        { name: 'Persistencia', detail: 'SQLite en WebAssembly (sql.js) con escrituras atómicas y copias diarias.' },
      ],
    },
    tech: ['Electron', 'React', 'TypeScript', 'SQLite', 'Tailwind CSS', 'Vitest', 'Playwright'],
    repo: 'https://github.com/alejmnz0/GestorHoras',
    images: [
      { src: '/projects/gestorhoras-imputar.webp', alt: 'Pantalla de imputación de horas de Gestor de Horas' },
      { src: '/projects/gestorhoras-estadisticas.webp', alt: 'Estadísticas de horas por proyecto' },
      { src: '/projects/gestorhoras-modo-noche.webp', alt: 'Gestor de Horas en modo noche' },
    ],
    hue: 190,
  },
  {
    id: 'fiya',
    name: 'Fiya',
    plate: 'AJ·02',
    year: 2024,
    category: 'Full Stack',
    status: 'academic',
    tagline: 'API REST, app móvil y panel web para gestionar campos, equipos y usuarios.',
    description:
      'Proyecto del ciclo DAM formado por una API en Spring Boot, una app móvil en Flutter y clientes web en Angular sobre un mismo dominio: campos, equipos, jugadores y usuarios.',
    problem:
      'Centralizar en un único backend la gestión de campos y equipos y exponerla tanto a una app móvil como a un panel web.',
    role: 'Proyecto académico del CFGS DAM (Salesianos Triana).',
    features: [
      'API REST con Spring Security y autenticación JWT.',
      'Documentación de la API con OpenAPI (springdoc).',
      'App Flutter con arquitectura BLoC y cliente HTTP con Chopper.',
      'Clientes web en Angular para campos, equipos y usuarios.',
    ],
    architecture: {
      summary: 'Un backend, varios clientes.',
      layers: [
        { name: 'fiyaback', detail: 'Spring Boot + JPA + PostgreSQL, JWT, validación y docker-compose.' },
        { name: 'fiya_front', detail: 'Flutter con BLoC, repositorios y modelos por dominio.' },
        { name: 'fiya_web*', detail: 'Aplicaciones Angular con servicios por entidad.' },
      ],
    },
    tech: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker', 'Flutter', 'Dart', 'Angular', 'TypeScript'],
    repo: 'https://github.com/alejmnz0/Fiya',
    images: [],
    hue: 140,
  },
  {
    id: 'grades-docker',
    name: 'GradesDocker',
    plate: 'AJ·03',
    year: 2024,
    category: 'Full Stack',
    status: 'academic',
    tagline: 'Gestión de calificaciones con Spring Boot, Angular y PostgreSQL, todo en Docker.',
    description:
      'Aplicación de calificaciones académicas: alumnos, asignaturas, instrumentos de evaluación y notas. Backend REST en Spring Boot, frontend en Angular 17 y base de datos PostgreSQL, orquestados con Docker Compose.',
    problem: 'Levantar un sistema completo de calificaciones con un solo comando y con redes separadas para frontend y backend.',
    role: 'Proyecto académico del CFGS DAM.',
    features: [
      'API REST por dominios (alumno, asignatura, calificación, instrumento) con DTOs y servicios.',
      'Spring Security + JWT y manejo centralizado de errores.',
      'Documentación OpenAPI.',
      'Docker Compose con tres servicios y redes frontnet / backnet.',
    ],
    architecture: {
      summary: 'Tres contenedores con redes aisladas.',
      layers: [
        { name: 'app', detail: 'Angular 17 + ng-bootstrap servido en su propio contenedor.' },
        { name: 'api', detail: 'Spring Boot + JPA, Security, validación y springdoc.' },
        { name: 'db', detail: 'PostgreSQL con volumen persistente, solo accesible desde la red backend.' },
      ],
    },
    tech: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Angular', 'TypeScript', 'Docker', 'Docker Compose'],
    repo: 'https://github.com/alejmnz0/GradesDocker',
    images: [],
    hue: 265,
  },
  {
    id: 'cinejava',
    name: 'CineJava',
    plate: 'AJ·04',
    year: 2023,
    category: 'Web',
    status: 'academic',
    tagline: 'Gestión de un cine: salas, películas, pases y entradas en PDF.',
    description:
      'Proyecto final de 1º de DAM. Aplicación web MVC para administrar un cine: al crear una sala se generan sus pases, las películas se vinculan a pases libres y el administrador configura el precio de la entrada y el recargo de asientos VIP.',
    problem: 'Modelar la lógica de un cine (salas, pases, asientos y precios) con roles de administrador y usuario.',
    role: 'Proyecto final de 1º DAM (Salesianos Triana).',
    features: [
      'Spring MVC con plantillas Thymeleaf y fragmentos reutilizables.',
      'Spring Security con roles administrador y usuario.',
      'Generación de entradas en PDF con OpenPDF.',
      'Base de datos H2 con datos iniciales.',
    ],
    tech: ['Java', 'Spring Boot', 'Spring Security', 'Thymeleaf', 'H2', 'HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/alejmnz0/Proyecto-1DAM',
    images: [],
    hue: 330,
  },
  {
    id: 'pokedamex',
    name: 'PokeDamex',
    plate: 'AJ·05',
    year: 2023,
    category: 'Web',
    status: 'academic',
    tagline: 'Pokédex web que consume la PokeAPI.',
    description:
      'Aplicación web en JavaScript que consume la PokeAPI para listar Pokémon con paginación, consultar especies, tipos, generaciones, bayas y objetos.',
    problem: 'Practicar el consumo de una API REST pública desde el navegador con paginación y vistas de detalle.',
    role: 'Práctica del CFGS DAM.',
    features: ['Listado paginado de Pokémon.', 'Vistas de bayas y objetos.', 'Filtros por tipo y generación.'],
    tech: ['JavaScript', 'jQuery', 'Bootstrap', 'HTML', 'CSS', 'APIs REST'],
    repo: 'https://github.com/alejmnz0/PokeDamex',
    images: [],
    hue: 25,
  },
  {
    id: '8botgame',
    name: '8BotGame',
    plate: 'AJ·06',
    year: 2024,
    category: 'Game',
    status: 'experiment',
    tagline: 'Videojuego 2D en Python con Pygame: bombas, agua y un traje de buzo.',
    description:
      'Juego 2D hecho con Pygame: el jugador se mueve con WASD, lanza bombas para romper obstáculos y se equipa un traje de submarinista para explorar bajo el agua, con oxígeno, vidas y diamantes.',
    problem: 'Experimento para practicar programación orientada a objetos y un bucle de juego en Python.',
    role: 'Proyecto personal de aprendizaje.',
    features: ['Bucle de juego en la clase InitGame.', 'Entidades modeladas como clases (Player, Bomb, Water, Oxigen…).', 'Sprites con spritesheet.'],
    tech: ['Python', 'Pygame'],
    repo: 'https://github.com/alejmnz0/8BotGame',
    images: [],
    hue: 50,
  },
];
