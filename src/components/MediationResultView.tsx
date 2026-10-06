import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Scale, 
  ArrowLeft, 
  Copy, 
  Check, 
  Film, 
  Clock, 
  Eye, 
  HeartHandshake, 
  Popcorn, 
  Quote, 
  AlertCircle,
  Share2
} from 'lucide-react';
import { MediationResult, Contender, MediationContext } from '../types';

interface MediationResultViewProps {
  result: MediationResult;
  contenders: Contender[];
  context: MediationContext;
  onReset: () => void;
  onEditContenders: () => void;
}

export const MediationResultView: React.FC<MediationResultViewProps> = ({
  result,
  contenders,
  context,
  onReset,
  onEditContenders,
}) => {
  const [copied, setCopied] = useState(false);
  const [showCompromiseHighlight, setShowCompromiseHighlight] = useState(false);

  const { verdict, compromiseFilm, filmAnalysis, summaryDilemma, popcornTrivia } = result;

  const handleCopyDeal = () => {
    const textToCopy = `🎟️ BOLETO DE MEDIACIÓN CINEMATOGRÁFICA 🎟️
🏆 Película Ganadora: ${verdict.winnerTitle} ${verdict.winnerAdvocate ? `(Defendida por: ${verdict.winnerAdvocate})` : ''}
⚖️ Veredicto: ${verdict.titleVerdict}
🛋️ Pacto del Sofá: ${verdict.concessionDeal}
✨ Película de Compromiso (Plan B): ${compromiseFilm.title} (${compromiseFilm.directorAndYear})
🍿 Dictado por CineMediador - El Tribunal del Celuloide`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onEditContenders}
          className="inline-flex items-center gap-1.5 text-xs font-ticket text-[#cbb8a0] hover:text-[#faeed1] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ajustar opciones o estado de ánimo</span>
        </button>

        <button
          onClick={onReset}
          className="text-xs font-ticket text-[#886958] hover:text-[#d4a34b] transition-colors cursor-pointer underline underline-offset-4"
        >
          Nueva Consulta al Tribunal
        </button>
      </div>

      {/* Dilemma Summary Kicker */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#20140e] border border-[#d4a34b]/30 text-xs font-ticket text-[#e5b768] uppercase tracking-wider mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Dictamen Imparcial Oficial</span>
        </div>
        <p className="text-base sm:text-lg text-[#d8c7af] font-editorial italic max-w-3xl mx-auto">
          «{summaryDilemma}»
        </p>
      </div>

      {/* SECTION 1: THE GRAND VERDICT (GOLDEN MARQUEE) */}
      <div className="relative bg-gradient-to-b from-[#24150d] via-[#1c110a] to-[#160d08] border-2 border-[#d4a34b] rounded-2xl p-6 sm:p-10 shadow-2xl mb-10 overflow-hidden">
        {/* Glow corner decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a34b]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7f1d1d]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-[#8a6018] to-[#e5b768] text-[#140c09] flex items-center justify-center shadow-lg mb-4">
            <Trophy className="w-7 h-7" />
          </div>

          <span className="text-xs font-ticket uppercase tracking-widest text-[#d4a34b] block mb-1">
            {verdict.titleVerdict}
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-marquee text-[#faeed1] tracking-tight mb-2 vintage-gold-glow">
            {verdict.winnerTitle}
          </h2>

          {verdict.winnerAdvocate && (
            <p className="text-xs sm:text-sm text-[#c8b79b] font-ticket uppercase tracking-wider mb-6">
              Opción recomendada para esta velada · Propuesta por{' '}
              <span className="text-[#faeed1] font-bold">{verdict.winnerAdvocate}</span>
            </p>
          )}

          {/* Impartial Judicial Reasoning */}
          <div className="bg-[#140c08]/85 border border-[#3e271a] rounded-xl p-5 sm:p-6 max-w-3xl mx-auto text-left mb-6 shadow-inner">
            <h4 className="text-xs font-ticket font-bold uppercase tracking-wider text-[#d4a34b] mb-2 flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5" />
              Fundamentos de la Sentencia:
            </h4>
            <p className="text-sm sm:text-base text-[#ede3ce] leading-relaxed font-editorial">
              {verdict.reasoning}
            </p>
          </div>

          {/* The Holy Sofa Concession Pact */}
          <div className="bg-[#2d1810]/70 border border-[#8a4224]/50 rounded-xl p-5 max-w-3xl mx-auto text-left flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-[#532414] text-[#f4c875] shrink-0 mt-0.5">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-ticket font-bold uppercase tracking-wider text-[#f4c875] mb-1">
                El Pacto Sagrado del Sofá (Cláusula de Compensación):
              </h4>
              <p className="text-xs sm:text-sm text-[#d8c5b0] leading-snug">
                {verdict.concessionDeal}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: THE COMPROMISE FILM (THIRD WAY) */}
      <div className="bg-[#180f0b] border border-[#523927] rounded-xl p-6 sm:p-8 mb-10 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#3b271d] pb-5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3b271d] border border-[#d4a34b]/30 flex items-center justify-center text-[#d4a34b]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-ticket uppercase tracking-widest text-[#d4a34b] block">
                ¿Ninguno quiere ceder? He aquí la solución
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-marquee text-[#faeed1]">
                La Película de Compromiso: «{compromiseFilm.title}»
              </h3>
            </div>
          </div>

          <div className="text-xs text-[#a89279] font-ticket">
            {compromiseFilm.directorAndYear}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-ticket uppercase tracking-wider text-[#d4a34b]">
              Por qué fusiona lo mejor de ambas:
            </h4>
            <p className="text-sm text-[#d8c7af] font-editorial leading-relaxed">
              {compromiseFilm.whyItSynthesizesBoth}
            </p>
            <div className="p-3 rounded-lg bg-[#120c09] border border-[#3b271d] text-xs text-[#bca78e]">
              <span className="font-semibold text-[#ede3ce] block mb-0.5">Equilibrio de ADN cinematográfico:</span>
              {compromiseFilm.whereToFindTone}
            </div>
          </div>

          <div className="bg-[#140c09] border border-[#3b271d] rounded-lg p-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-ticket text-[#886958] uppercase tracking-wider block mb-1">
                Sinopsis exprés de consenso:
              </span>
              <p className="text-xs sm:text-sm text-[#ede3ce] italic font-editorial leading-relaxed">
                «{compromiseFilm.shortSynopsis}»
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#2a1b12] flex items-center justify-between">
              <span className="text-[11px] text-[#a89279] font-ticket">
                Válida como comodín pacífico
              </span>
              <button
                onClick={() => setShowCompromiseHighlight(!showCompromiseHighlight)}
                className="text-xs px-3 py-1.5 rounded bg-[#2b1b13] hover:bg-[#3b271d] text-[#faeed1] font-ticket transition-colors cursor-pointer"
              >
                {showCompromiseHighlight ? 'Ocultar pacto' : 'Elegir esta de común acuerdo'}
              </button>
            </div>
          </div>
        </div>

        {showCompromiseHighlight && (
          <div className="mt-4 p-4 rounded-lg bg-[#27150c] border border-[#d4a34b]/50 text-center animate-fade-in">
            <p className="text-sm font-editorial text-[#faeed1]">
              🌟 ¡Pacto de Compromiso Aceptado! Habéis elegido <strong className="text-[#f4c875]">«{compromiseFilm.title}»</strong>. Ninguno pierde, el buen cine gana y la velada está a salvo.
            </p>
          </div>
        )}
      </div>

      {/* SECTION 3: HEAD-TO-HEAD COMPARATIVE DUEL */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Film className="w-5 h-5 text-[#d4a34b]" />
          <h3 className="text-xl font-bold font-marquee text-[#faeed1]">
            Duelo Cara a Cara: Análisis de Contendientes
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filmAnalysis.map((film, idx) => {
            const isWinner = film.title.trim().toLowerCase() === verdict.winnerTitle.trim().toLowerCase();
            return (
              <div
                key={idx}
                className={`rounded-xl p-6 border transition-all duration-300 relative ${
                  isWinner
                    ? 'bg-[#1e130c] border-[#d4a34b] shadow-xl shadow-[#d4a34b]/10'
                    : 'bg-[#160e0a] border-[#3b271d] opacity-95'
                }`}
              >
                {/* Winner badge or contender number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-ticket px-2 py-0.5 rounded bg-[#120c09] border border-[#3b271d] text-[#bca78e]">
                      Opción {idx + 1}
                    </span>
                    {film.advocate && (
                      <span className="text-xs font-ticket text-[#cbb8a0]">
                        Defendida por {film.advocate}
                      </span>
                    )}
                  </div>

                  {isWinner && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-ticket font-bold text-[#140c09] bg-[#d4a34b] px-2.5 py-0.5 rounded-full">
                      <Trophy className="w-3 h-3" />
                      Ganadora de hoy
                    </span>
                  )}
                </div>

                <h4 className="text-2xl font-bold font-marquee text-[#faeed1] mb-1">
                  {film.title}
                </h4>

                <div className="text-xs text-[#a89279] font-ticket mb-4">
                  {film.directorAndYear} · {film.runtimeApprox}
                </div>

                {/* Film metrics table */}
                <div className="space-y-2.5 bg-[#120c09] rounded-lg p-3.5 border border-[#331f14] text-xs mb-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[#886958] font-ticket shrink-0">Tono y Género:</span>
                    <span className="text-[#ede3ce] text-right font-medium">{film.genreAndTone}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-[#23150e] pt-2">
                    <span className="text-[#886958] font-ticket flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Ritmo:
                    </span>
                    <span className="text-[#f4c875] font-semibold">{film.pacingRating}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-[#23150e] pt-2">
                    <span className="text-[#886958] font-ticket flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Atención exigida:
                    </span>
                    <span className="text-[#d8c7af]">{film.attentionRequired}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2 border-t border-[#23150e] pt-2">
                    <span className="text-[#886958] font-ticket shrink-0">Carga emocional:</span>
                    <span className="text-[#ede3ce] text-right">{film.emotionalWeight}</span>
                  </div>
                </div>

                {/* Strengths & Risks */}
                <div className="space-y-3 mb-4 text-xs">
                  <div>
                    <span className="font-ticket font-bold text-[#62b97f] block mb-0.5">
                      ✓ Punto fuerte para esta velada:
                    </span>
                    <p className="text-[#d8c7af] font-editorial leading-relaxed">
                      {film.whyWatchToday}
                    </p>
                  </div>

                  <div>
                    <span className="font-ticket font-bold text-[#df7979] flex items-center gap-1 mb-0.5">
                      <AlertCircle className="w-3 h-3" /> Riesgo a considerar hoy:
                    </span>
                    <p className="text-[#bca78e] font-editorial leading-relaxed">
                      {film.risksToday}
                    </p>
                  </div>
                </div>

                {/* Advocate's Golden Pitch */}
                <div className="bg-[#1b100a] border-l-2 border-[#d4a34b] pl-3 py-2 text-xs italic text-[#faeed1] font-editorial">
                  <span className="not-italic text-[10px] font-ticket text-[#d4a34b] block uppercase mb-0.5">
                    Argumento para su defensor:
                  </span>
                  {film.advocatePitch}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: THE VINTAGE CINEMA TICKET */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-[#d4a34b]" />
            <h3 className="text-xl font-bold font-marquee text-[#faeed1]">
              Pase de Admisión del Consenso
            </h3>
          </div>

          <button
            onClick={handleCopyDeal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d4a34b]/40 bg-[#25150e] hover:bg-[#341d13] text-[#f4c875] text-xs font-ticket transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#62b97f]" />
                <span className="text-[#62b97f]">¡Copiado para WhatsApp!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Pacto para WhatsApp</span>
              </>
            )}
          </button>
        </div>

        {/* The Vintage Ticket Container */}
        <div className="relative bg-[#1a100b] border-2 border-dashed border-[#d4a34b]/60 rounded-xl p-6 sm:p-8 shadow-2xl ticket-left-cutout">
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6">
            {/* Main Ticket Body */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-dashed border-[#4a3122] pb-6 md:pb-0 md:pr-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-widest font-ticket uppercase text-[#d4a34b]">
                  GRAN CINEMA MEDIADOR · SALA DE PROYECCIÓN
                </span>
                <span className="text-xs font-ticket text-[#886958]">
                  BOLETO #{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-bold font-marquee text-[#faeed1] mb-1">
                {verdict.winnerTitle}
              </div>

              <div className="text-xs font-editorial text-[#c8b79b] italic mb-4">
                Resolución: {verdict.titleVerdict}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-ticket bg-[#120b08] p-3 rounded-lg border border-[#382316] mb-4">
                <div>
                  <span className="text-[10px] text-[#886958] block">HORARIO:</span>
                  <span className="text-[#faeed1] font-bold">HOY · 21:30 HRS</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#886958] block">UBICACIÓN:</span>
                  <span className="text-[#faeed1] font-bold">SOFÁ PRINCIPAL</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#886958] block">PLAN B (COMPROMISO):</span>
                  <span className="text-[#f4c875] truncate block">{compromiseFilm.title}</span>
                </div>
              </div>

              <div className="text-xs text-[#d8c5b0] bg-[#24130b] p-3 rounded border border-[#522916]">
                <strong className="text-[#f4c875] font-ticket block mb-0.5">CLÁUSULA DE PAZ ACEPTADA:</strong>
                {verdict.concessionDeal}
              </div>
            </div>

            {/* Tear-off Stub */}
            <div className="w-full md:w-56 flex flex-col justify-between items-center text-center pt-2 md:pt-0">
              <div className="w-full">
                <div className="w-16 h-16 mx-auto rounded-full border-2 border-[#d4a34b] flex items-center justify-center text-[#d4a34b] font-marquee font-bold text-lg mb-2">
                  ADMIT
                </div>
                <div className="text-[11px] font-ticket tracking-wider text-[#d4a34b] uppercase font-bold">
                  AUTORIZADO
                </div>
                <div className="text-[9px] font-ticket text-[#886958]">
                  SIN DERECHO A QUEJAS NI VETOS
                </div>
              </div>

              {/* Barcode graphic */}
              <div className="w-full pt-4 mt-4 border-t border-[#3b271d]">
                <div className="h-8 flex justify-center items-center gap-[2px] opacity-70 mb-1">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-full bg-[#faeed1]"
                      style={{ width: i % 3 === 0 ? '3px' : i % 2 === 0 ? '1.5px' : '1px' }}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-ticket text-[#886958] tracking-widest block">
                  0982-CINE-MEDIADOR-2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popcorn Trivia Box */}
      {popcornTrivia && (
        <div className="bg-[#170e0a] border border-[#3b271d] rounded-xl p-5 mb-8 flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-[#2d1b11] text-[#f4c875] shrink-0">
            <Popcorn className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-ticket uppercase tracking-wider text-[#d4a34b] block mb-1">
              Curiosidad de la Taquilla (Para leer mientras hacéis las palomitas):
            </span>
            <p className="text-xs sm:text-sm text-[#d8c7af] font-editorial leading-relaxed">
              {popcornTrivia}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#27150c] hover:bg-[#381f12] text-[#f4c875] border border-[#d4a34b]/40 font-ticket text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-[#d4a34b]/15"
        >
          <Film className="w-4 h-4" />
          <span>Resolver otro dilema cinematográfico</span>
        </button>
      </div>
    </div>
  );
};
