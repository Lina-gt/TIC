import { PresetDilemma } from '../types';

export const PRESET_DILEMMAS: PresetDilemma[] = [
  {
    id: 'scifi-vs-romance',
    title: 'Interstellar vs Orgullo y Prejuicio',
    badge: 'Épica Cósmica vs Romance de Época',
    movie1: { title: 'Interstellar', advocate: 'Carlos' },
    movie2: { title: 'Orgullo y Prejuicio', advocate: 'Elena' },
    vibe: 'Cita en el sofá con manta y té caliente',
    availableTime: '100 - 140 min',
    suggestedCompromise: 'Una cuestión de tiempo (About Time) o Contact',
  },
  {
    id: 'nolan-vs-gerwig',
    title: 'Oppenheimer vs Barbie',
    badge: 'El Legendario Duelo Barbenheimer',
    movie1: { title: 'Oppenheimer', advocate: 'Cinéfilo Intenso' },
    movie2: { title: 'Barbie', advocate: 'Amante del Pop y Sátira' },
    vibe: 'Fin de semana con ganas de debatir',
    availableTime: '> 140 min (Noche larga)',
    suggestedCompromise: 'The Truman Show o La La Land',
  },
  {
    id: 'thriller-vs-comedy',
    title: 'Zodiac vs Puñales por la Espalda (Knives Out)',
    badge: 'Misterio Denso vs Ingenio Ligero',
    movie1: { title: 'Zodiac', advocate: 'Marta' },
    movie2: { title: 'Puñales por la Espalda', advocate: 'Lucas' },
    vibe: 'Viernes noche cansados tras trabajar',
    availableTime: '< 130 min',
    suggestedCompromise: 'La Ventana Indiscreta (Hitchcock) o Kiss Kiss Bang Bang',
  },
  {
    id: 'terror-vs-animacion',
    title: 'Hereditary vs El Viaje de Chihiro',
    badge: 'Tensión Oscura vs Fantasía Envolvente',
    movie1: { title: 'Hereditary', advocate: 'Valiente' },
    movie2: { title: 'El Viaje de Chihiro', advocate: 'Buscador de Confort' },
    vibe: 'Palomitas y desconexión total',
    availableTime: '100 - 125 min',
    suggestedCompromise: 'Coraline o El Laberinto del Fauno',
  },
  {
    id: 'wes-anderson-vs-tarantino',
    title: 'El Gran Hotel Budapest vs Pulp Fiction',
    badge: 'Simetría Pastel vs Diálogos Pólvora',
    movie1: { title: 'El Gran Hotel Budapest', advocate: 'Esteta Minucioso' },
    movie2: { title: 'Pulp Fiction', advocate: 'Nostálgico de los 90' },
    vibe: 'Ganas de reír y disfrutar cine con estilo',
    availableTime: '100 - 140 min',
    suggestedCompromise: 'Snatch: Cerdos y Diamantes o Fargo',
  },
];

export const VIBE_OPTIONS = [
  { id: 'cansados', label: 'Cansados tras trabajar', desc: 'Evitar ritmo excesivamente lento, queremos engancharnos' },
  { id: 'romantica', label: 'Cita romántica y manta', desc: 'Emoción compartida, calidez, piel de gallina' },
  { id: 'palomitas', label: 'Palomitas y cero drama', desc: 'Entretenimiento puro, risas o adrenalina sin traumas' },
  { id: 'cinefilo', label: 'Modo Cinemateca profundo', desc: 'Ganas de reflexionar, planos cuidados y debate post-película' },
  { id: 'adrenalina', label: 'Tensión y giros de guión', desc: 'Un thriller absorbente que mantenga despiertos' },
];

export const TIME_OPTIONS = [
  { id: 'corta', label: '< 100 min', desc: 'Mañana se madruga o es tarde' },
  { id: 'media', label: '100 - 135 min', desc: 'Duración estándar de oro' },
  { id: 'larga', label: '> 140 min', desc: 'Tenemos la noche entera por delante' },
];

export const POPULAR_SUGGESTIONS = [
  'El Padrino',
  'Amélie',
  'Interstellar',
  'Dune',
  'Todo en todas partes al mismo tiempo',
  'Blade Runner 2049',
  'La La Land',
  'Parásitos (Parasite)',
  'Whiplash',
  'El Viaje de Chihiro',
  'Cinema Paradiso',
  'Puñales por la Espalda',
];
