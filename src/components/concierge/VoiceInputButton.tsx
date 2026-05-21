"use client";

import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type VoiceInputButtonProps = {
  onTranscript: (text: string) => void;
  className?: string;
};

export function VoiceInputButton({ onTranscript, className }: VoiceInputButtonProps) {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const recogRef = useRef<WebSpeechRecognition | null>(null);
  const cbRef = useRef(onTranscript);

  useLayoutEffect(() => {
    cbRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    const SR =
      typeof window !== "undefined"
        ? (window.SpeechRecognition || window.webkitSpeechRecognition)
        : undefined;
    if (!SR) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount capability check
      setSupported(false);
      return;
    }
    const recognition = new SR() as WebSpeechRecognition;
    recognition.lang = "de-DE";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event: WebSpeechRecognitionEvent) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) final += res[0]?.transcript ?? "";
        else interim += res[0]?.transcript ?? "";
      }
      const text = (final || interim).trim();
      if (text) cbRef.current(text);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recogRef.current = recognition;
    return () => {
      try {
        recognition.stop();
      } catch {
        /* noop */
      }
    };
  }, []);

  const toggle = useCallback(() => {
    const r = recogRef.current;
    if (!r) return;
    if (listening) {
      r.stop();
      setListening(false);
    } else {
      try {
        r.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  }, [listening]);

  if (!supported) {
    return (
      <button
        type="button"
        disabled
        title="Spracheingabe wird in diesem Browser nicht unterstützt"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-none border border-dashed border-[#eaeaea] text-[#9a9a9a]",
          className,
        )}
      >
        <MicOff className="size-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={listening}
      className={cn(
        "group relative inline-flex size-11 items-center justify-center overflow-hidden rounded-none border border-[#eaeaea] bg-white text-[#111111] shadow-[0_1px_3px_rgba(17,17,17,0.06)] transition duration-250 ease-out hover:-translate-y-0.5 hover:border-premium/35 hover:shadow-[0_8px_20px_-10px_rgba(17,17,17,0.12)] active:scale-[0.98]",
        listening && "border-premium/50 ring-2 ring-premium/20",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100",
          listening && "opacity-100",
        )}
      />
      {listening ? (
        <Mic className="relative size-4 animate-pulse" />
      ) : (
        <Mic className="relative size-4" />
      )}
    </button>
  );
}
