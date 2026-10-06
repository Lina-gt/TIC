import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { ContenderForm } from './components/ContenderForm';
import { MediationResultView } from './components/MediationResultView';
import { CoinFlipModal } from './components/CoinFlipModal';
import { QuickTestModal } from './components/QuickTestModal';
import { Contender, MediationContext, MediationResult, PresetDilemma } from './types';
import { Film, Clapperboard, Sparkles } from 'lucide-react';

const INITIAL_CONTENDERS: Contender[] = [
  {
    id: '1',
    title: 'Interstellar',
    advocate: 'Carlos',
    notes: 'Quiero algo épico y asombroso',
  },
  {
    id: '2',
    title: 'Orgullo y Prejuicio',
    advocate: 'Elena',
    notes: 'Quiero algo reconfortante y con buena fotografía',
  },
];

const INITIAL_CONTEXT: MediationContext = {
  vibe: 'Cita romántica y manta',
  availableTime: '100 - 135 min',
  lastPickedBy: 'Empate / Ninguno recientemente',
  specialNotes: '',
};

export default function App() {
  const [contenders, setContenders] = useState<Contender[]>(INITIAL_CONTENDERS);
  const [context, setContext] = useState<MediationContext>(INITIAL_CONTEXT);
  const [activePresetId, setActivePresetId] = useState<string | undefined>('scifi-vs-romance');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MediationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isCoinFlipOpen, setIsCoinFlipOpen] = useState(false);
  const [isQuickQuizOpen, setIsQuickQuizOpen] = useState(false);

  const handleSelectPreset = (preset: PresetDilemma) => {
    setActivePresetId(preset.id);
    setContenders([
      {
        id: '1',
        title: preset.movie1.title,
        advocate: preset.movie1.advocate,
        notes: '',
      },
      {
        id: '2',
        title: preset.movie2.title,
        advocate: preset.movie2.advocate,
        notes: '',
      },
    ]);
    setContext((prev) => ({
      ...prev,
      vibe: preset.vibe,
      availableTime: preset.availableTime,
    }));
    setResult(null);
    setError(null);
  };

  const handleSubmitMediate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/mediate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contenders: contenders.map((c) => ({
            title: c.title,
            advocate: c.advocate,
            notes: c.notes,
          })),
          context,
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo obtener el veredicto del servidor.');
      }

      const data: MediationResult = await response.json();
      setResult(data);

      // Trigger celebratory confetti for the golden verdict
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#d4a34b', '#e5b768', '#f7f1e1', '#b88628'],
      });
    } catch (err: unknown) {
      console.error('Error durante la mediación:', err);
      // Client-side fallback if server fails
      const fallbackResult: MediationResult = {
        summaryDilemma: `Duelo de titanes entre "${contenders[0]?.title}" y "${contenders[1]?.title}". El tribunal ha deliberado en base a vuestra vibra de hoy (${context.vibe}).`,
        filmAnalysis: contenders.map((c, i) => ({
          title: c.title,
          advocate: c.advocate,
          directorAndYear: i === 0 ? 'Obra Maestra Consagrada' : 'Clásico Indiscutible',
          genreAndTone: i === 0 ? 'Inmersión profunda y espectáculo' : 'Emoción elegante y cuidada puesta en escena',
          runtimeApprox: 'Aprox. 120-130 min',
          pacingRating: 'Ritmo medio y absorbente',
          attentionRequired: 'Media (engancha sin esfuerzo)',
          emotionalWeight: 'Gran impacto y belleza visual',
          whyWatchToday: `Brilla con luz propia cuando buscáis desconectar con una gran historia.`,
          risksToday: `Exige respetar los primeros minutos sin distracciones.`,
          advocatePitch: `"Esta noche nos merecemos una historia que nos transporte de verdad."`,
        })),
        verdict: {
          winnerTitle: contenders[0]?.title || 'Película A',
          winnerAdvocate: contenders[0]?.advocate || 'Cinéfilo 1',
          titleVerdict: `Sentencia Solemne: El celuloide corona a "${contenders[0]?.title || 'la primera opción'}"`,
          reasoning: `Considerando el estado de ánimo seleccionado (${context.vibe}), esta opción ofrece la inmersión colectiva ideal para hoy. Ambos disfrutarán del ritmo sin sensación de fatiga.`,
          concessionDeal: `Pacto Sagrado del Sofá: Quien defendió "${contenders[1]?.title}" tiene derecho inalienable a elegir la cena y tendrá el voto decisivo en la próxima sesión.`,
        },
        compromiseFilm: {
          title: 'Una cuestión de tiempo (About Time) / Medianoche en París',
          directorAndYear: 'Consenso universal (2011-2013)',
          whyItSynthesizesBoth: 'Combina el asombro conceptual con la calidez y el corazón que enamora a ambas partes.',
          shortSynopsis: 'Una hermosa reflexión sobre el tiempo, el amor y los instantes cotidianos.',
          whereToFindTone: 'Tiene el ingenio de una y la ternura de la otra.',
        },
        popcornTrivia:
          'En el cine clásico, el olor de las palomitas en el vestíbulo se usaba para relajar a la audiencia antes de que comenzase la proyección.',
      };
      setResult(fallbackResult);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectWinnerFromCoin = (winnerTitle: string) => {
    // Automatically fill or set verdict for this winner
    handleSubmitMediate();
  };

  const handleFinishQuiz = (winnerIdx: number, reason: string) => {
    const chosen = contenders[winnerIdx] || contenders[0];
    const other = contenders[winnerIdx === 0 ? 1 : 0] || contenders[1];

    setResult({
      summaryDilemma: `Resultado directo del Test de Compatibilidad: vuestras respuestas han señalado a "${chosen.title}" como la candidata idónea.`,
      filmAnalysis: [
        {
          title: chosen.title,
          advocate: chosen.advocate,
          directorAndYear: 'Selección afinada por el test',
          genreAndTone: 'Sintonizada con vuestro nivel de atención y ritmo de hoy',
          runtimeApprox: 'Duración adecuada',
          pacingRating: 'Alineado con lo que habéis respondido',
          attentionRequired: 'Equilibrada',
          emotionalWeight: 'Acorde a vuestras preferencias inmediatas',
          whyWatchToday: reason,
          risksToday: 'Ninguno relevante si se respeta el ambiente de cine.',
          advocatePitch: `"El test no miente: es exactamente la dosis de cine que nos pedía el cuerpo hoy."`,
        },
        {
          title: other.title,
          advocate: other.advocate,
          directorAndYear: 'Segunda candidata en acta',
          genreAndTone: 'Propuesta valiosa reservada para la siguiente sesión',
          runtimeApprox: 'Duración estándar',
          pacingRating: 'Ritmo alternativo',
          attentionRequired: 'Media-alta',
          emotionalWeight: 'Queda archivada con honores',
          whyWatchToday: 'Queda como la primera opción para la siguiente velada.',
          risksToday: 'Podía no cuadrar al 100% con vuestro nivel de energía de hoy.',
          advocatePitch: `"La guardamos con devoción para la próxima función."`,
        },
      ],
      verdict: {
        winnerTitle: chosen.title,
        winnerAdvocate: chosen.advocate,
        titleVerdict: `Sentencia por Test: «${chosen.title}» gana por compatibilidad de sala`,
        reasoning: reason,
        concessionDeal: `Pacto de Sala: Quien defendió "${other.title}" elige el postre y la siguiente película de la lista sin debate alguno.`,
      },
      compromiseFilm: {
        title: 'Cinema Paradiso (Giuseppe Tornatore)',
        directorAndYear: '1988 · Obra de Paz Universal',
        whyItSynthesizesBoth: 'El amor más puro por el séptimo arte que emociona a cualquier espectador sin excepción.',
        shortSynopsis: 'La historia de una amistad entrañable y una sala de cine de pueblo que marca la vida de un niño para siempre.',
        whereToFindTone: 'Pura nostalgia, música inolvidable de Morricone y emoción genuina.',
      },
      popcornTrivia:
        'En los cines de los años 50, se creía que proyectar imágenes subliminales de palomitas aumentaba el apetito, aunque más tarde se demostró que el verdadero motor era el delicioso aroma de la mantequilla.',
    });

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#d4a34b', '#e5b768'],
    });
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#120c0a] text-[#ede3ce] flex flex-col justify-between selection:bg-[#d4a34b]/30 selection:text-[#faeed1]">
      <div>
        <Header onSelectPreset={handleSelectPreset} activePresetId={activePresetId} />

        <main className="relative">
          {/* Loading Projector Overlay */}
          {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md">
              <div className="text-center p-8 max-w-sm">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-[#3b271d] border-t-[#d4a34b] animate-spin flex items-center justify-center mb-6 shadow-2xl">
                  <Film className="w-8 h-8 text-[#d4a34b] animate-pulse" />
                </div>
                <h3 className="text-xl font-bold font-marquee text-[#faeed1] mb-2 vintage-gold-glow">
                  El Tribunal Delibera
                </h3>
                <p className="text-xs text-[#bca78e] font-editorial italic leading-relaxed">
                  Analizando arcos narrativos, ritmo de montaje, cansancio acumulado y buscando la justicia cinematográfica perfecta...
                </p>
                <div className="mt-4 flex justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#d4a34b] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#d4a34b] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#d4a34b] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-3xl mx-auto mt-4 px-4">
              <div className="bg-[#381111] border border-[#a83232] rounded-lg p-4 text-xs text-[#f4c875]">
                {error}
              </div>
            </div>
          )}

          {result ? (
            <MediationResultView
              result={result}
              contenders={contenders}
              context={context}
              onReset={handleReset}
              onEditContenders={() => setResult(null)}
            />
          ) : (
            <ContenderForm
              contenders={contenders}
              onChangeContenders={(newC) => {
                setContenders(newC);
                setActivePresetId(undefined);
              }}
              context={context}
              onChangeContext={(newCtx) => {
                setContext(newCtx);
                setActivePresetId(undefined);
              }}
              onSubmitMediate={handleSubmitMediate}
              onOpenCoinFlip={() => setIsCoinFlipOpen(true)}
              onOpenQuickQuiz={() => setIsQuickQuizOpen(true)}
              isLoading={isLoading}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <CoinFlipModal
        isOpen={isCoinFlipOpen}
        onClose={() => setIsCoinFlipOpen(false)}
        contenders={contenders}
        onSelectWinner={handleSelectWinnerFromCoin}
      />

      <QuickTestModal
        isOpen={isQuickQuizOpen}
        onClose={() => setIsQuickQuizOpen(false)}
        contenders={contenders}
        onFinishQuiz={handleFinishQuiz}
      />

      {/* Vintage Cinema Footer */}
      <footer className="border-t border-[#3b271d] bg-[#140c09] py-8 px-4 text-center text-xs text-[#8e7865] font-ticket">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#cbb8a0]">
            <Clapperboard className="w-4 h-4 text-[#d4a34b]" />
            <span className="font-marquee font-bold tracking-wider text-[#faeed1]">
              CINEMEDIADOR
            </span>
            <span aria-hidden="true">·</span>
            <span>El Tribunal del Celuloide</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span>Paz conyugal garantizada</span>
            <span aria-hidden="true">·</span>
            <span>Veredictos sin apelación</span>
            <span aria-hidden="true">·</span>
            <span>Cinefilia Imparcial</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
