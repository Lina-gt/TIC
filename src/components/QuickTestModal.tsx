import React, { useState } from 'react';
import { X, CheckCircle, Award, Film } from 'lucide-react';
import { Contender } from '../types';

interface QuickTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  contenders: Contender[];
  onFinishQuiz: (recommendedIndex: number, reasoning: string) => void;
}

interface Question {
  title: string;
  desc: string;
  options: {
    label: string;
    subtext: string;
    pointsTo: number; // 0 or 1
  }[];
}

export const QuickTestModal: React.FC<QuickTestModalProps> = ({
  isOpen,
  onClose,
  contenders,
  onFinishQuiz,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([0, 0]);

  if (!isOpen) return null;

  const validContenders = contenders.filter((c) => c.title.trim().length > 0);
  const title1 = validContenders[0]?.title || 'Película A';
  const title2 = validContenders[1]?.title || 'Película B';

  const questions: Question[] = [
    {
      title: '1. ¿Qué ritmo os pide el cuerpo esta noche?',
      desc: 'Pensad con honestidad en vuestro cansancio real.',
      options: [
        {
          label: 'Ritmo ágil y directo',
          subtext: 'Que pasen cosas rápido para no dispersarnos ni mirar el móvil.',
          pointsTo: 0,
        },
        {
          label: 'Atmósfera envolvente y pausada',
          subtext: 'Queremos saborear la fotografía, la música y los silencios.',
          pointsTo: 1,
        },
      ],
    },
    {
      title: '2. ¿Qué poso emocional queréis que os deje?',
      desc: 'El estado de ánimo al encender las luces.',
      options: [
        {
          label: 'Calidez, asombro o adrenalina pura',
          subtext: 'Salir con energía positiva y sensación de viaje.',
          pointsTo: 0,
        },
        {
          label: 'Reflexión profunda, misterio o catarsis',
          subtext: 'De las que te dejan pensando 20 minutos en la cama.',
          pointsTo: 1,
        },
      ],
    },
    {
      title: '3. Nivel de atención que podéis comprometer hoy:',
      desc: 'El pacto de concentración de la sala.',
      options: [
        {
          label: 'Atención media o compartida',
          subtext: 'Comer palomitas o comentar alguna escena sin perder el hilo.',
          pointsTo: 0,
        },
        {
          label: 'Foco cinematográfico total (100%)',
          subtext: 'Silencio absoluto en la sala, inmersión sin distracciones.',
          pointsTo: 1,
        },
      ],
    },
  ];

  const handleSelectOption = (pointsTo: number) => {
    const newScores = [...scores];
    newScores[pointsTo] = (newScores[pointsTo] || 0) + 1;
    setScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished
      const winnerIdx = newScores[0] >= newScores[1] ? 0 : 1;
      const winnerTitle = winnerIdx === 0 ? title1 : title2;
      const reason = `Tras evaluar ritmo y nivel de atención, "${winnerTitle}" encaja mejor con vuestras respuestas de hoy.`;
      onFinishQuiz(winnerIdx, reason);
      onClose();
    }
  };

  const currentQ = questions[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#180f0b] border border-[#d4a34b]/40 rounded-xl p-6 shadow-2xl text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#886958] hover:text-[#faeed1] transition-colors p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-[#d4a34b]" />
          <span className="text-xs font-ticket uppercase text-[#d4a34b] tracking-wider">
            Test de Compatibilidad Express · Pregunta {currentStep + 1} de {questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#2a1b13] h-1.5 rounded-full mb-6 overflow-hidden">
          <div
            className="bg-[#d4a34b] h-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Title */}
        <h3 className="text-lg font-bold font-marquee text-[#faeed1] mb-1">
          {currentQ.title}
        </h3>
        <p className="text-xs text-[#bca78e] font-editorial mb-5">
          {currentQ.desc}
        </p>

        {/* Options */}
        <div className="space-y-3 mb-4">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt.pointsTo)}
              className="w-full p-4 rounded-lg bg-[#20140e] border border-[#442c1f] hover:border-[#d4a34b] hover:bg-[#2c1b12] text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-[#faeed1] group-hover:text-[#f4c875]">
                  {opt.label}
                </span>
                <CheckCircle className="w-4 h-4 text-[#442c1f] group-hover:text-[#d4a34b] transition-colors" />
              </div>
              <p className="text-xs text-[#a38d77]">{opt.subtext}</p>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#342217] text-[11px] text-[#7a6452] font-ticket">
          <span>Opciones: «{title1}» vs «{title2}»</span>
          <span>Sin disputas, con objetividad cinéfila</span>
        </div>
      </div>
    </div>
  );
};
