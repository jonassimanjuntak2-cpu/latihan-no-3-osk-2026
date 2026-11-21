import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type TTSStatus = 'idle' | 'speaking' | 'paused' | 'unsupported';

export interface MisterJoTTSState {
  status: TTSStatus;
  isSupported: boolean;
  voiceLabel: string;
  hasIndonesianVoice: boolean;
  rate: number;
  sentences: string[];
  activeSentenceIndex: number;
  setRate: (rate: number) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  repeat: () => void;
  stop: () => void;
}

function splitIntoSentences(script: string): string[] {
  const cleaned = script.replace(/\s+/g, ' ').trim();
  if (!cleaned) return [];
  const raw = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  return raw ? raw.map((s) => s.trim()).filter(Boolean) : [cleaned];
}

function pickBestIndonesianMaleVoice(voices: SpeechSynthesisVoice[]): {
  voice: SpeechSynthesisVoice | null;
  hasIndonesian: boolean;
  label: string;
} {
  if (!voices.length) {
    return {
      voice: null,
      hasIndonesian: false,
      label: 'Suara TTS sistem belum tersedia di browser ini (gunakan naskah sinkron)',
    };
  }

  const idVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith('id')
  );

  if (idVoices.length > 0) {
    const maleHint = idVoices.find((v) =>
      /(ardi|male|pria|laki|david|daniel|indra|budi|google bahasa indonesia)/i.test(
        v.name
      )
    );
    const chosen = maleHint ?? idVoices[0];
    return {
      voice: chosen,
      hasIndonesian: true,
      label: `${chosen.name} (${chosen.lang})`,
    };
  }

  const fallbackMale = voices.find((v) =>
    /(male|david|daniel|alex|google uk english male)/i.test(v.name)
  );
  const chosen = fallbackMale ?? voices[0];
  return {
    voice: chosen,
    hasIndonesian: false,
    label: `${chosen.name} (${chosen.lang} — fallback non-ID)`,
  };
}

export function useMisterJoTTS(script: string): MisterJoTTSState {
  const isSupported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined';

  const sentences = useMemo(() => splitIntoSentences(script), [script]);

  const [status, setStatus] = useState<TTSStatus>(
    isSupported ? 'idle' : 'unsupported'
  );
  const [rate, setRateState] = useState<number>(1.0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(-1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const isPlayingRef = useRef(false);
  const currentIdxRef = useRef(0);
  const rateRef = useRef(rate);
  const sentencesRef = useRef(sentences);

  rateRef.current = rate;
  sentencesRef.current = sentences;

  useEffect(() => {
    if (!isSupported) return;
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        setVoices(available);
      }
    };
    loadVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', loadVoices);
    };
  }, [isSupported]);

  const voiceSelection = useMemo(
    () => pickBestIndonesianMaleVoice(voices),
    [voices]
  );

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    currentIdxRef.current = 0;
    setActiveSentenceIndex(-1);
    if (isSupported) {
      window.speechSynthesis.cancel();
      setStatus('idle');
    }
  }, [isSupported]);

  // Cancel speech cleanly when script changes or component unmounts
  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [script, isSupported]);

  useEffect(() => {
    stop();
  }, [script, stop]);

  const speakIndex = useCallback(
    (idx: number) => {
      if (!isSupported || !isPlayingRef.current) return;
      const list = sentencesRef.current;
      if (idx >= list.length) {
        isPlayingRef.current = false;
        currentIdxRef.current = 0;
        setActiveSentenceIndex(-1);
        setStatus('idle');
        return;
      }

      currentIdxRef.current = idx;
      setActiveSentenceIndex(idx);

      const utterance = new SpeechSynthesisUtterance(list[idx]);
      utterance.lang = 'id-ID';
      utterance.rate = rateRef.current;
      utterance.pitch = 0.92; // Authoritative adult male tone
      if (voiceSelection.voice) {
        utterance.voice = voiceSelection.voice;
      }

      utterance.onend = () => {
        if (isPlayingRef.current) {
          speakIndex(idx + 1);
        }
      };

      utterance.onerror = () => {
        isPlayingRef.current = false;
        setStatus('idle');
      };

      window.speechSynthesis.speak(utterance);
    },
    [isSupported, voiceSelection.voice]
  );

  const play = useCallback(() => {
    if (!isSupported || sentencesRef.current.length === 0) return;
    window.speechSynthesis.cancel();
    isPlayingRef.current = true;
    setStatus('speaking');
    speakIndex(0);
  }, [isSupported, speakIndex]);

  const pause = useCallback(() => {
    if (!isSupported || status !== 'speaking') return;
    window.speechSynthesis.pause();
    setStatus('paused');
  }, [isSupported, status]);

  const resume = useCallback(() => {
    if (!isSupported || status !== 'paused') return;
    window.speechSynthesis.resume();
    setStatus('speaking');
  }, [isSupported, status]);

  const repeat = useCallback(() => {
    play();
  }, [play]);

  const setRate = useCallback(
    (newRate: number) => {
      setRateState(newRate);
      rateRef.current = newRate;
      if (isPlayingRef.current && status === 'speaking') {
        const resumeFrom = Math.max(0, currentIdxRef.current);
        window.speechSynthesis.cancel();
        speakIndex(resumeFrom);
      }
    },
    [speakIndex, status]
  );

  return {
    status,
    isSupported,
    voiceLabel: voiceSelection.label,
    hasIndonesianVoice: voiceSelection.hasIndonesian,
    rate,
    sentences,
    activeSentenceIndex,
    setRate,
    play,
    pause,
    resume,
    repeat,
    stop,
  };
}
