import React, { useState } from 'react';
import { Pause, Play, RotateCcw, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { useMisterJoTTS } from '../hooks/useMisterJoTTS';

interface MisterJoNarratorProps {
  title: string;
  script: string;
  compact?: boolean;
}

export const MisterJoAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({
  size = 'md',
}) => {
  const dim =
    size === 'lg' ? 'w-16 h-16' : size === 'sm' ? 'w-9 h-9' : 'w-12 h-12';
  return (
    <div
      className={`${dim} rounded-2xl bg-yellow-400 border-2 border-zinc-900 flex items-center justify-center shrink-0 overflow-hidden`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <rect width="64" height="64" fill="#FACC15" />
        {/* Shoulders / Collar */}
        <path
          d="M12 64 C12 48, 22 44, 32 44 C42 44, 52 48, 52 64 Z"
          fill="#18181B"
        />
        <path d="M27 44 L32 53 L37 44 Z" fill="#FFFFFF" />
        {/* Neck */}
        <rect x="27" y="38" width="10" height="8" rx="3" fill="#FDBA74" />
        {/* Face */}
        <circle cx="32" cy="27" r="13" fill="#FED7AA" />
        {/* Hair */}
        <path
          d="M19 25 C19 14, 26 10, 33 11 C41 11, 46 16, 45 25 C43 19, 38 17, 31 18 C25 18, 21 21, 19 25 Z"
          fill="#18181B"
        />
        {/* Glasses */}
        <rect
          x="22"
          y="23"
          width="8.5"
          height="6"
          rx="1.5"
          fill="none"
          stroke="#18181B"
          strokeWidth="1.8"
        />
        <rect
          x="33.5"
          y="23"
          width="8.5"
          height="6"
          rx="1.5"
          fill="none"
          stroke="#18181B"
          strokeWidth="1.8"
        />
        <line
          x1="30.5"
          y1="26"
          x2="33.5"
          y2="26"
          stroke="#18181B"
          strokeWidth="1.8"
        />
        {/* Eyes */}
        <circle cx="26.2" cy="26" r="1.2" fill="#18181B" />
        <circle cx="37.8" cy="26" r="1.2" fill="#18181B" />
        {/* Friendly confident smile */}
        <path
          d="M27.5 33 Q32 36.5 36.5 33"
          fill="none"
          stroke="#18181B"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const MisterJoNarrator: React.FC<MisterJoNarratorProps> = ({
  title,
  script,
  compact = false,
}) => {
  const tts = useMisterJoTTS(script);
  const [showTranscript, setShowTranscript] = useState(!compact);

  return (
    <section
      aria-label={`Narator Suara Mister Jo: ${title}`}
      className="rounded-2xl border border-zinc-200 bg-yellow-50/70 p-4 sm:p-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <MisterJoAvatar size={compact ? 'sm' : 'md'} />
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
              <span className="font-semibold text-zinc-900">Tutor Suara Mister Jo</span>
              <span aria-hidden="true">·</span>
              <span>{title}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {!tts.isSupported
                ? 'Browser ini tidak mendukung Web Speech API. Gunakan naskah narasi tertulis di bawah.'
                : tts.hasIndonesianVoice
                  ? `Suara aktif: ${tts.voiceLabel}`
                  : tts.voiceLabel}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {tts.status === 'speaking' ? (
            <button
              type="button"
              onClick={tts.pause}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Pause className="w-3.5 h-3.5" />
              Jeda
            </button>
          ) : tts.status === 'paused' ? (
            <button
              type="button"
              onClick={tts.resume}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-yellow-400 text-zinc-950 border border-zinc-900 text-xs font-semibold hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5" />
              Lanjutkan
            </button>
          ) : (
            <button
              type="button"
              onClick={tts.play}
              disabled={!tts.isSupported}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-yellow-400 text-zinc-950 border border-zinc-900 text-xs font-semibold hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Putar Suara
            </button>
          )}

          <button
            type="button"
            onClick={tts.repeat}
            disabled={!tts.isSupported}
            aria-label="Ulangi narasi Mister Jo"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-zinc-300 text-zinc-800 text-xs font-medium hover:bg-zinc-50 disabled:opacity-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Ulangi
          </button>

          <label className="inline-flex items-center gap-1.5 bg-white border border-zinc-300 rounded-xl px-2.5 py-1.5 text-xs text-zinc-700">
            <span>Kecepatan</span>
            <select
              aria-label="Kecepatan suara Mister Jo"
              value={tts.rate}
              onChange={(e) => tts.setRate(Number(e.target.value))}
              className="bg-transparent font-mono-tabular font-semibold text-zinc-900 focus:outline-none cursor-pointer"
            >
              <option value={0.85}>0,85x</option>
              <option value={1.0}>1,0x</option>
              <option value={1.15}>1,15x</option>
            </select>
          </label>

          <button
            type="button"
            onClick={() => setShowTranscript((v) => !v)}
            aria-expanded={showTranscript}
            className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-medium text-zinc-700 hover:bg-yellow-100 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {showTranscript ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Tutup Teks
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Naskah
              </>
            )}
          </button>
        </div>
      </div>

      {showTranscript && (
        <div className="mt-3.5 pt-3.5 border-t border-yellow-200/90 text-sm leading-relaxed text-zinc-700 space-y-1">
          {tts.sentences.map((sentence, idx) => {
            const isActive = idx === tts.activeSentenceIndex;
            return (
              <span
                key={idx}
                className={`inline transition-colors duration-150 ${
                  isActive
                    ? 'bg-yellow-300 text-zinc-950 font-medium px-1 rounded'
                    : ''
                }`}
              >
                {sentence}{' '}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
};
