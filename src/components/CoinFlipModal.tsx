import React, { useState } from 'react';
import { X, Sparkles, Disc, Film } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Contender } from '../types';

interface CoinFlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  contenders: Contender[];
  onSelectWinner: (winnerTitle: string) => void;
}

export const CoinFlipModal: React.FC<CoinFlipModalProps> = ({
  isOpen,
  onClose,
  contenders,
  onSelectWinner,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [winner, setWinner] = useState<Contender | null>(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  if (!isOpen) return null;

  const validContenders = contenders.filter((c) => c.title.trim().length > 0);
  const opt1 = validContenders[0] || { title: 'Película A', advocate: 'Cinéfilo 1' };
  const opt2 = validContenders[1] || { title: 'Película B', advocate: 'Cinéfilo 2' };

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setWinner(null);

    // Pick random winner
    const chosenIndex = Math.random() < 0.5 ? 0 : 1;
    const chosen = chosenIndex === 0 ? opt1 : opt2;

    // Calculate rotation: at least 5 full 360 spins + final angle (0 for opt1, 180 for opt2)
    const extraTurns = 5 * 360;
    const targetAngle = rotationDegrees + extraTurns + (chosenIndex === 0 ? 0 : 180);
    setRotationDegrees(targetAngle);

    setTimeout(() => {
      setIsFlipping(false);
      setWinner(chosen);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4a34b', '#e5b768', '#991b1b', '#faeed1'],
      });
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#180f0b] border border-[#d4a34b]/40 rounded-xl p-6 shadow-2xl text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#886958] hover:text-[#faeed1] transition-colors p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Vintage Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#d4a34b]/30 bg-[#25150e] text-[#e5b768] text-xs font-ticket uppercase mb-3">
          <Disc className="w-3.5 h-3.5 text-[#d4a34b]" />
          <span>Cara o Cruz de 35mm</span>
        </div>

        <h3 className="text-xl font-bold font-marquee text-[#faeed1] mb-1">
          La Moneda del Destino
        </h3>
        <p className="text-xs text-[#bca78e] font-editorial mb-6">
          Cuando el debate no cede y las palomitas se enfrían, el celuloide tira de azar.
        </p>

        {/* 3D Coin Container */}
        <div className="h-44 flex items-center justify-center perspective-[1000px] mb-6 select-none">
          <div
            className="w-32 h-32 rounded-full relative transition-transform duration-[2200ms] ease-out shadow-2xl border-4 border-[#b88628] bg-gradient-to-tr from-[#8a6018] via-[#e5b768] to-[#996b18] flex items-center justify-center cursor-pointer transform-gpu"
            style={{
              transform: `rotateY(${rotationDegrees}deg)`,
              transformStyle: 'preserve-3d',
            }}
            onClick={handleFlip}
          >
            {/* Front Side */}
            <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center p-2 text-center text-[#1c110a] backface-hidden">
              <Film className="w-7 h-7 mb-1 text-[#422606]" />
              <span className="text-[10px] uppercase font-ticket font-bold tracking-wider text-[#382005]">
                {opt1.advocate || 'Opción 1'}
              </span>
              <span className="text-xs font-bold font-marquee line-clamp-1 px-1">
                {opt1.title || 'Película A'}
              </span>
            </div>

            {/* Back Side (Rotated 180deg) */}
            <div
              className="absolute inset-0 rounded-full flex flex-col items-center justify-center p-2 text-center text-[#1c110a] backface-hidden"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <Sparkles className="w-7 h-7 mb-1 text-[#422606]" />
              <span className="text-[10px] uppercase font-ticket font-bold tracking-wider text-[#382005]">
                {opt2.advocate || 'Opción 2'}
              </span>
              <span className="text-xs font-bold font-marquee line-clamp-1 px-1">
                {opt2.title || 'Película B'}
              </span>
            </div>
          </div>
        </div>

        {/* Winner Announcement or Action Button */}
        {winner ? (
          <div className="bg-[#24150e] border border-[#d4a34b]/60 rounded-lg p-4 mb-5 animate-scale-up">
            <span className="text-[10px] uppercase tracking-widest font-ticket text-[#d4a34b]">
              El Azar ha dictado sentencia:
            </span>
            <div className="text-lg font-bold font-marquee text-[#faeed1] mt-0.5">
              «{winner.title}»
            </div>
            {winner.advocate && (
              <span className="text-xs text-[#c8b79b] font-editorial italic block mt-0.5">
                Propuesta por {winner.advocate}
              </span>
            )}
            <button
              onClick={() => {
                onSelectWinner(winner.title);
                onClose();
              }}
              className="mt-3 w-full py-2 px-4 rounded bg-[#d4a34b] hover:bg-[#e5b768] text-[#140c09] text-xs font-ticket font-bold uppercase transition-colors cursor-pointer"
            >
              Verificar con el Tribunal Completo
            </button>
          </div>
        ) : (
          <button
            onClick={handleFlip}
            disabled={isFlipping}
            className={`w-full py-3 px-6 rounded-lg font-ticket font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              isFlipping
                ? 'bg-[#3b271d] text-[#886958] cursor-not-allowed'
                : 'bg-gradient-to-r from-[#d4a34b] to-[#e5b768] text-[#140c09] hover:brightness-110 shadow-lg shadow-[#d4a34b]/20'
            }`}
          >
            {isFlipping ? 'Girando en el proyector...' : '¡Lanzar la Moneda del Cine!'}
          </button>
        )}
      </div>
    </div>
  );
};
