import React, { useState } from 'react';
import { Plus, Trash2, SlidersHorizontal, Scale, Coins, HelpCircle, Film, Sparkles, User } from 'lucide-react';
import { Contender, MediationContext } from '../types';
import { VIBE_OPTIONS, TIME_OPTIONS, POPULAR_SUGGESTIONS } from '../data/presets';

interface ContenderFormProps {
  contenders: Contender[];
  onChangeContenders: (contenders: Contender[]) => void;
  context: MediationContext;
  onChangeContext: (context: MediationContext) => void;
  onSubmitMediate: () => void;
  onOpenCoinFlip: () => void;
  onOpenQuickQuiz: () => void;
  isLoading: boolean;
}

export const ContenderForm: React.FC<ContenderFormProps> = ({
  contenders,
  onChangeContenders,
  context,
  onChangeContext,
  onSubmitMediate,
  onOpenCoinFlip,
  onOpenQuickQuiz,
  isLoading,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleUpdateContender = (id: string, field: keyof Contender, value: string) => {
    onChangeContenders(
      contenders.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleAddContender = () => {
    if (contenders.length >= 4) return;
    const newId = String(Date.now());
    const nextNum = contenders.length + 1;
    onChangeContenders([
      ...contenders,
      {
        id: newId,
        title: '',
        advocate: `Cinéfilo ${nextNum}`,
        notes: '',
      },
    ]);
  };

  const handleRemoveContender = (id: string) => {
    if (contenders.length <= 2) return;
    onChangeContenders(contenders.filter((c) => c.id !== id));
  };

  const handleSuggestionClick = (title: string, contenderId: string) => {
    handleUpdateContender(contenderId, 'title', title);
  };

  const isFormValid = contenders.every((c) => c.title.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner / Callout */}
      <div className="bg-[#1b120d] border border-[#d4a34b]/25 rounded-xl p-6 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4a34b]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#3b271d] pb-5 mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-marquee text-[#faeed1] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#d4a34b]" />
              Las Obras en Disputa
            </h2>
            <p className="text-xs sm:text-sm text-[#bca78e] mt-1 font-editorial">
              Ingresad las películas que compiten por la pantalla. El Mediador analizará ritmo, carga emocional y el estado de ánimo de hoy.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCoinFlip}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d4a34b]/40 bg-[#25150e] hover:bg-[#321c13] text-[#f0ca7d] text-xs font-ticket transition-colors cursor-pointer"
              title="¿Empate total? Deja que el azar decida con la moneda de 35mm"
            >
              <Coins className="w-3.5 h-3.5 text-[#d4a34b]" />
              <span>Cara o Cruz</span>
            </button>

            <button
              type="button"
              onClick={onOpenQuickQuiz}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#523927] bg-[#1c120c] hover:bg-[#2a1b12] text-[#d6c4ad] text-xs font-ticket transition-colors cursor-pointer"
              title="Responded 3 preguntas rápidas para desempatar por puntos"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#bca78e]" />
              <span>Test 3 Preguntas</span>
            </button>
          </div>
        </div>

        {/* Contenders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {contenders.map((contender, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C...
            return (
              <div
                key={contender.id}
                className="bg-[#140c09] border border-[#442c1f] rounded-lg p-4 relative group hover:border-[#d4a34b]/50 transition-all duration-200"
              >
                {/* Header of contender card */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#d4a34b]/15 border border-[#d4a34b]/40 text-[#f4c875] text-xs font-ticket font-bold flex items-center justify-center">
                      {letter}
                    </span>
                    <span className="text-xs uppercase tracking-wider font-ticket text-[#bca78e]">
                      Opción {index + 1}
                    </span>
                  </div>

                  {contenders.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveContender(contender.id)}
                      className="text-[#886958] hover:text-[#e06666] transition-colors p-1 cursor-pointer"
                      title="Eliminar esta opción"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Movie Title Input */}
                <div className="mb-3">
                  <label className="block text-xs font-ticket text-[#d8c7af] mb-1">
                    Título de la película:
                  </label>
                  <div className="relative">
                    <Film className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#886958]" />
                    <input
                      type="text"
                      value={contender.title}
                      onChange={(e) => handleUpdateContender(contender.id, 'title', e.target.value)}
                      placeholder="Ej: Interstellar, Amélie, El Padrino..."
                      className="w-full bg-[#1e130e] border border-[#523927] focus:border-[#d4a34b] text-[#faeed1] rounded-md pl-9 pr-3 py-2 text-sm placeholder-[#7c6352] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Advocate / Defender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-[11px] font-ticket text-[#a89279] mb-1">
                      Defendida por:
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#886958]" />
                      <input
                        type="text"
                        value={contender.advocate}
                        onChange={(e) => handleUpdateContender(contender.id, 'advocate', e.target.value)}
                        placeholder="Nombre (ej. Elena)"
                        className="w-full bg-[#1b110c] border border-[#442c1f] focus:border-[#d4a34b] text-[#ede3ce] rounded pl-8 pr-2 py-1.5 text-xs placeholder-[#7c6352] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-ticket text-[#a89279] mb-1">
                      ¿Por qué le apetece? (opcional):
                    </label>
                    <input
                      type="text"
                      value={contender.notes || ''}
                      onChange={(e) => handleUpdateContender(contender.id, 'notes', e.target.value)}
                      placeholder="Ej. Quiero algo emotivo"
                      className="w-full bg-[#1b110c] border border-[#442c1f] focus:border-[#d4a34b] text-[#ede3ce] rounded px-2.5 py-1.5 text-xs placeholder-[#7c6352] outline-none"
                    />
                  </div>
                </div>

                {/* Mini quick suggestions if empty */}
                {!contender.title && (
                  <div className="mt-2 pt-2 border-t border-[#2d1c13]">
                    <span className="text-[10px] text-[#886958] font-ticket block mb-1">
                      Sugerencias rápidas:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {POPULAR_SUGGESTIONS.slice(index * 4, index * 4 + 4).map((pop) => (
                        <button
                          key={pop}
                          type="button"
                          onClick={() => handleSuggestionClick(pop, contender.id)}
                          className="text-[11px] px-2 py-0.5 rounded bg-[#1e130e] hover:bg-[#2f1d14] text-[#cbb8a0] border border-[#3e271a] transition-colors cursor-pointer"
                        >
                          {pop}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add button if < 4 */}
        {contenders.length < 4 && (
          <div className="text-center mb-6">
            <button
              type="button"
              onClick={handleAddContender}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-[#553b2a] hover:border-[#d4a34b]/60 bg-[#160e0a] hover:bg-[#20150f] text-[#cbb8a0] hover:text-[#f4c875] text-xs font-ticket transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir otra película en discordia (máx 4)</span>
            </button>
          </div>
        )}

        {/* Context & Night Settings Section */}
        <div className="bg-[#140c09] border border-[#3e271a] rounded-lg p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#d4a34b]" />
              <h3 className="text-sm font-bold font-ticket text-[#f4eedb] uppercase tracking-wider">
                El Estado de la Sala (Contexto de Hoy)
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs text-[#a89279] hover:text-[#d4a34b] font-ticket underline underline-offset-4 cursor-pointer"
            >
              {showAdvanced ? 'Ocultar detalles' : 'Ajustes de justicia y tiempo'}
            </button>
          </div>

          {/* Vibe Selector */}
          <div className="mb-4">
            <label className="block text-xs font-ticket text-[#bca78e] mb-2 uppercase tracking-wide">
              ¿Qué energía / vibra tenéis esta noche?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {VIBE_OPTIONS.map((v) => {
                const isSelected = context.vibe === v.label;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => onChangeContext({ ...context, vibe: v.label })}
                    className={`p-2.5 rounded-md text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-[#2d1b11] border-[#d4a34b] text-[#faeed1] shadow-md shadow-[#d4a34b]/10'
                        : 'bg-[#180f0b] border-[#382316] text-[#bca78e] hover:border-[#633e28] hover:text-[#ede3ce]'
                    }`}
                  >
                    <div className="text-xs font-semibold leading-tight mb-1">{v.label}</div>
                    <div className="text-[10px] text-[#8e7865] leading-snug line-clamp-2">{v.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selector & Justice Factor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-ticket text-[#bca78e] mb-2 uppercase tracking-wide">
                Tiempo disponible:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TIME_OPTIONS.map((t) => {
                  const isSelected = context.availableTime === t.label;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onChangeContext({ ...context, availableTime: t.label })}
                      className={`py-2 px-2 rounded text-center transition-all border text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-[#2d1b11] border-[#d4a34b] text-[#faeed1] font-semibold'
                          : 'bg-[#180f0b] border-[#382316] text-[#bca78e] hover:border-[#633e28]'
                      }`}
                    >
                      <div>{t.label}</div>
                      <div className="text-[9px] text-[#8e7865] truncate">{t.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-ticket text-[#bca78e] mb-2 uppercase tracking-wide">
                Factor de Justicia: ¿Quién eligió la última vez?
              </label>
              <select
                value={context.lastPickedBy}
                onChange={(e) => onChangeContext({ ...context, lastPickedBy: e.target.value })}
                className="w-full bg-[#180f0b] border border-[#382316] text-[#ede3ce] focus:border-[#d4a34b] rounded py-2 px-3 text-xs outline-none cursor-pointer"
              >
                <option value="Empate / Ninguno recientemente">Empate o primera sesión juntos</option>
                {contenders.map((c, i) => (
                  <option key={c.id} value={c.advocate || `Cinéfilo ${i + 1}`}>
                    {c.advocate ? `${c.advocate} eligió la última vez` : `Opción ${i + 1} eligió la última vez`}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-[#7a6452] mt-1 font-editorial italic">
                El Mediador considerará el equilibrio de la relación al dictar sentencia.
              </p>
            </div>
          </div>

          {/* Advanced conditional notes */}
          {showAdvanced && (
            <div className="mt-4 pt-4 border-t border-[#2f1c13]">
              <label className="block text-xs font-ticket text-[#bca78e] mb-1 uppercase tracking-wide">
                Condiciones especiales o líneas rojas:
              </label>
              <input
                type="text"
                value={context.specialNotes || ''}
                onChange={(e) => onChangeContext({ ...context, specialNotes: e.target.value })}
                placeholder="Ej: Nada de terror explícito, nada con finales excesivamente desgarradores..."
                className="w-full bg-[#180f0b] border border-[#382316] focus:border-[#d4a34b] text-[#ede3ce] rounded px-3 py-1.5 text-xs placeholder-[#7c6352] outline-none"
              />
            </div>
          )}
        </div>

        {/* Big Mediation Submission CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-[#9d866f] font-editorial italic text-center sm:text-left">
            «Todo veredicto incluye el análisis de ritmo, la opción ganadora y una película de compromiso de reserva.»
          </div>

          <button
            type="button"
            disabled={!isFormValid || isLoading}
            onClick={onSubmitMediate}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-ticket font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer ${
              !isFormValid || isLoading
                ? 'bg-[#3b271d] text-[#7c6352] cursor-not-allowed border border-[#4d3224]'
                : 'bg-gradient-to-r from-[#d4a34b] via-[#e5b768] to-[#c99738] text-[#140c09] hover:brightness-110 shadow-[#d4a34b]/20 hover:shadow-[#d4a34b]/35 scale-100 hover:scale-[1.02] border border-[#f4c875]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#140c09] border-t-transparent rounded-full animate-spin" />
                <span>Consultando al Tribunal...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#140c09]" />
                <span>¡Dictar Sentencia Cinematográfica!</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
