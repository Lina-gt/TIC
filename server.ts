import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface Contender {
  title: string;
  advocate?: string;
  notes?: string;
}

interface MediationContext {
  vibe: string;
  availableTime: string;
  lastPickedBy?: string;
  energyLevel?: string;
  specialNotes?: string;
}

interface MediationRequestBody {
  contenders: Contender[];
  context: MediationContext;
}

function buildFallbackMediation(contenders: Contender[], context: MediationContext) {
  const c1 = contenders[0]?.title || 'Película A';
  const c2 = contenders[1]?.title || 'Película B';
  const adv1 = contenders[0]?.advocate || 'Cinéfilo 1';
  const adv2 = contenders[1]?.advocate || 'Cinéfilo 2';

  return {
    summaryDilemma: `Un duelo cinematográfico de alto calibre entre la visión propuesta por ${adv1} ("${c1}") y la alternativa de ${adv2} ("${c2}"). El tribunal ha valorado el estado de ánimo (${context.vibe}) y el tiempo disponible (${context.availableTime}).`,
    filmAnalysis: [
      {
        title: c1,
        advocate: adv1,
        directorAndYear: 'Obra consagrada',
        genreAndTone: 'Inmersión visual y narrativa con fuerte identidad',
        runtimeApprox: 'Aprox. 115-130 min',
        pacingRating: 'Ritmo medio y absorbente',
        attentionRequired: 'Media (engancha sin esfuerzo)',
        emotionalWeight: 'Experiencia estimulante con momentos de impacto',
        whyWatchToday: `Excelente para sumergirse de lleno si buscan una historia con personalidad única que recompensa cada minuto.`,
        risksToday: `Si el cansancio acecha, requiere que ambos se comprometan a no mirar el teléfono en los primeros 20 minutos.`,
        advocatePitch: `"No es solo una película, es un viaje que recordaremos haber compartido juntos esta noche."`,
      },
      {
        title: c2,
        advocate: adv2,
        directorAndYear: 'Cine de autor / Género predilecto',
        genreAndTone: 'Tono envolvente con gran resonancia emocional',
        runtimeApprox: 'Aprox. 105-125 min',
        pacingRating: 'Dinámica y con encanto',
        attentionRequired: 'Equilibrada (fácil de seguir)',
        emotionalWeight: 'Calidez, tensión medida o humor inteligente',
        whyWatchToday: `Se adapta con naturalidad a la vibra actual (${context.vibe}), permitiendo disfrutar sin fricción.`,
        risksToday: `Podría dejar a la otra parte con ganas del giro estilístico que ofrecía la primera opción.`,
        advocatePitch: `"Tiene el equilibrio perfecto entre entretenimiento genuino y alma artística para nuestra velada."`,
      },
    ],
    verdict: {
      winnerTitle: c1,
      winnerAdvocate: adv1,
      titleVerdict: `Sentencia Solemne: La velada se rinde ante "${c1}"`,
      reasoning: `Considerando la energía del momento (${context.vibe}) y la necesidad de una experiencia compartida memorable, el Tribunal dictamina que "${c1}" ofrece el punto de encuentro más sólido para hoy. Su propuesta consigue equilibrar la atención de ambos sin caer en tiempos muertos. No obstante, la calidad de "${c2}" queda reconocida en acta y tendrá prioridad absoluta en la siguiente función.`,
      concessionDeal: `Pacto Sagrado del Sofá: Quien defendió "${c2}" (${adv2}) obtiene el derecho inalienable a elegir el acompañamiento gastronómico de hoy, el lado preferido del sofá, y tendrá voto de oro sin posibilidad de réplica en la próxima elección.`,
    },
    compromiseFilm: {
      title: 'El Gran Hotel Budapest / Medianoche en París',
      directorAndYear: 'Cine de consenso universal (2011-2014)',
      whyItSynthesizesBoth: `Si el debate persiste en tablas, esta obra combina ingenio visual, calidez humana, ritmo impecable y una duración comedida que satisface por igual al amante de la estética y al que busca pasar un rato delicioso.`,
      shortSynopsis: 'Una travesía repleta de encanto visual, diálogos memorables y ritmo ágil donde cada plano es una pintura.',
      whereToFindTone: 'El punto medio exacto entre el espectáculo cinéfilo y el confort hogareño.',
    },
    popcornTrivia:
      '¿Sabías que en los cines de los años 30 las palomitas se popularizaron durante la Gran Depresión precisamente porque eran el único lujo asequible que unía a personas con gustos completamente dispares?',
  };
}

// Endpoint: Mediation analysis
app.post('/api/mediate', async (req: Request, res: Response) => {
  try {
    const { contenders, context } = req.body as MediationRequestBody;

    if (!contenders || !Array.isArray(contenders) || contenders.length < 2) {
      res.status(400).json({ error: 'Se requieren al menos dos películas para mediar.' });
      return;
    }

    // Clean titles
    const validContenders = contenders.filter((c) => c && c.title && c.title.trim().length > 0);
    if (validContenders.length < 2) {
      res.status(400).json({ error: 'Debes ingresar al menos 2 títulos válidos.' });
      return;
    }

    if (!apiKey) {
      console.warn('GEMINI_API_KEY no configurada. Usando mediador experto de respaldo.');
      const fallback = buildFallbackMediation(validContenders, context || { vibe: 'Casual', availableTime: 'Normal' });
      res.json(fallback);
      return;
    }

    const contendersDescription = validContenders
      .map(
        (c, idx) =>
          `Película ${idx + 1}: "${c.title}" (Defendida por: ${c.advocate || 'Participante ' + (idx + 1)}${
            c.notes ? ' | Notas: ' + c.notes : ''
          })`
      )
      .join('\n');

    const contextDescription = `
- Vibra / Estado de ánimo deseado: ${context?.vibe || 'Neutral / Buen cine'}
- Tiempo disponible: ${context?.availableTime || 'Estándar'}
- Última persona en elegir previamente: ${context?.lastPickedBy || 'No especificado (empate)'}
- Nivel de energía: ${context?.energyLevel || 'Normal'}
- Peticiones especiales: ${context?.specialNotes || 'Ninguna'}
`;

    const prompt = `Actúa como el "Mediador Cinematográfico Imparcial" (El Gran Juez del Tribunal del Celuloide).
Tu misión es resolver la indecisión de una pareja o grupo de amigos que no logran ponerse de acuerdo en qué película ver hoy.

Eres un erudito del séptimo arte, ingenioso, culto, con gran sentido del humor elegante, empático y justo.
Analiza a fondo las películas candidatas, compara su ritmo, estilo cinematográfico, directores, tono, exigencia mental y adecuación a la velada.

Películas en disputa:
${contendersDescription}

Contexto de la velada:
${contextDescription}

Debes responder ÚNICAMENTE en formato JSON válido con la siguiente estructura exacta:
{
  "summaryDilemma": "Breve sinopsis ingeniosa del dilema (1 o 2 oraciones, tono cinéfilo y divertido)",
  "filmAnalysis": [
    {
      "title": "Nombre de la película",
      "advocate": "Nombre del defensor",
      "directorAndYear": "Director y año (aprox/real si se conoce)",
      "genreAndTone": "Género y tono predominante",
      "runtimeApprox": "Duración estimada (ej: 118 min)",
      "pacingRating": "Pausado y contemplativo | Ritmo medio y absorbente | Frenético e imparable",
      "attentionRequired": "Baja (desconexión) | Media (entretenimiento atento) | Alta (máxima concentración)",
      "emotionalWeight": "Carga emocional (ej: Lágrima dulce, adrenalina pura, risa inteligente, tensión psicológica)",
      "whyWatchToday": "Punto fuerte clave para verla HOY según el contexto",
      "risksToday": "Riesgo potencial hoy (ej: alguien podría dormirse si está cansado, o resultar demasiado densa)",
      "advocatePitch": "Frase ingeniosa y persuasiva para que su defensor la defienda con amor y argumentos cinéfilos"
    }
  ],
  "verdict": {
    "winnerTitle": "Título exacto de la película ganadora para ver HOY",
    "winnerAdvocate": "Nombre de la persona que la propuso",
    "titleVerdict": "Título formal y vintage del decreto (ej: Sentencia Nº 404: El celuloide premia la ligereza)",
    "reasoning": "Explicación cinematográfica y psicológica clara, justa e incontestable de por qué esta película es la MEJOR elección para ver juntos HOY (3-4 oraciones bien hiladas).",
    "concessionDeal": "El 'Pacto Sagrado del Sofá': compensación humorística pero justa para quien no ganó hoy (ej: derecho indiscutible a elegir postre/cena hoy, mejor sitio en el sofá, y derecho de elección sin veto en la próxima cita)."
  },
  "compromiseFilm": {
    "title": "Título de una película de compromiso alternativa",
    "directorAndYear": "Director y año de esta tercera película",
    "whyItSynthesizesBoth": "Explicación cinéfila de cómo fusiona milimétricamente el ADN de lo que busca cada una de las partes en conflicto",
    "shortSynopsis": "Sinopsis seductora en 2 oraciones",
    "whereToFindTone": "Qué toma de la opción A y qué toma de la opción B"
  },
  "popcornTrivia": "Una anécdota o curiosidad real y fascinante del rodaje o historia del cine relacionada con alguna de las opciones para amenizar la velada."
}

Importante: Responde en español culto, cálido y apasionado por el cine. Asegúrate de que el JSON sea estrictamente parseable.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    try {
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (parseError) {
      console.error('Error al parsear respuesta JSON de Gemini:', parseError, text);
      const fallback = buildFallbackMediation(validContenders, context || { vibe: 'Casual', availableTime: 'Normal' });
      res.json(fallback);
    }
  } catch (error) {
    console.error('Error en /api/mediate:', error);
    try {
      const fallback = buildFallbackMediation(req.body?.contenders || [], req.body?.context || { vibe: 'Normal', availableTime: 'Estándar' });
      res.json(fallback);
    } catch {
      res.status(500).json({ error: 'Ocurrió un error al procesar el veredicto del mediador.' });
    }
  }
});

// Curated classic presets for quick exploration
app.get('/api/presets', (_req: Request, res: Response) => {
  res.json([
    {
      id: 'nolan-vs-gerwig',
      title: 'Oppenheimer vs Barbie (Barbenheimer)',
      badge: 'El Clásico Reciente',
      movie1: { title: 'Oppenheimer', advocate: 'Cinéfilo Intenso' },
      movie2: { title: 'Barbie', advocate: 'Amante del Pop Art' },
      vibe: 'Fin de semana con ganas de debatir',
      availableTime: '> 140 min (Noche larga)',
      suggestedCompromise: 'La La Land o The Truman Show',
    },
    {
      id: 'scifi-vs-romance',
      title: 'Interstellar vs Orgullo y Prejuicio',
      badge: 'Épica Cósmica vs Romance de Época',
      movie1: { title: 'Interstellar', advocate: 'Carlos' },
      movie2: { title: 'Orgullo y Prejuicio', advocate: 'Elena' },
      vibe: 'Cita en el sofá con manta y té',
      availableTime: '100 - 140 min',
      suggestedCompromise: 'About Time (Una cuestión de tiempo) o Arrival',
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
      badge: 'Escalofríos vs Asombro Visual',
      movie1: { title: 'Hereditary', advocate: 'Amante del Terror' },
      movie2: { title: 'El Viaje de Chihiro', advocate: 'Buscador de Confort' },
      vibe: 'Palomitas y desconexión',
      availableTime: '100 - 125 min',
      suggestedCompromise: 'Coraline (Los mundos de Coraline) o El Laberinto del Fauno',
    },
  ]);
});

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CineMediador] Servidor activo en http://0.0.0.0:${PORT}`);
  });
}

startServer();
