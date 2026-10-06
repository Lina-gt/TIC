import React from 'react';
import { Film, Clapperboard, Sparkles } from 'lucide-react';
import { PRESET_DILEMMAS } from '../data/presets';
import { PresetDilemma } from '../types';

interface HeaderProps {
  onSelectPreset: (preset: PresetDilemma) => void;
  activePresetId?: string;
}

export const Header: React.FC<HeaderProps> = ({ onSelectPreset, activePresetId }) => {
  return (
    <header className="relative pt-8 pb-6 px-4 border-b border-[#3b271d] bg-gradient-to-b from-[#1c110d] via-[#140c09] to-[#120c0a]">
      {/* Decorative top film strip bar */}
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between overflow-hidden opacity-30 select-none">
        <div className="flex gap-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-5 h-3 border border-[#d4a34b] rounded-[1px] bg-black/40" />
          ))}
        </div>
        <span className="text-[10px] tracking-widest text-[#d4a34b] font-ticket uppercase">
          TRIBUNAL DEL CELULOIDE · SALA 1 · SISTEMA 35MM
        </span>
        <div className="flex gap-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-5 h-3 border border-[#d4a34b] rounded-[1px] bg-black/40" />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Vintage Theater Signboard */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4a34b]/30 bg-[#25150e]/80 text-[#e6bc6e] text-xs font-ticket uppercase tracking-wider mb-4 shadow-inner">
          <Clapperboard className="w-4 h-4 text-[#d4a34b]" />
          <span>El Mediador Cinematográfico Imparcial</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a34b] animate-ping" />
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-marquee text-[#faeed1] tracking-tight leading-none mb-3 vintage-gold-glow">
          CINEMEDIADOR
        </h1>

        <p className="text-sm sm:text-base text-[#c8b79b] font-editorial italic max-w-2xl mx-auto mb-6">
          «Donde las indecisiones de pareja y amigos encuentran paz, armonía y la película perfecta para ver hoy.»
        </p>

        {/* Quick presets bar for immediate 1-click test */}
        <div className="mt-4 pt-4 border-t border-[#342217]/60">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#a89279] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a34b]" />
            <span className="font-ticket uppercase tracking-wider">Dilemas Populares para probar:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESET_DILEMMAS.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className={`text-xs px-3 py-1.5 rounded transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#c99738] text-[#140c09] font-semibold border-[#f4c875] shadow-lg shadow-[#c99738]/20 scale-102'
                      : 'bg-[#1e130e]/90 text-[#d8c7af] hover:text-[#faeed1] border-[#442c1f] hover:border-[#d4a34b]/50 hover:bg-[#2a1b14]'
                  }`}
                >
                  <span className="font-medium">{preset.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
