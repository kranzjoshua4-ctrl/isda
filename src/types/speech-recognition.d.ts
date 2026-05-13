export {};

declare global {
  interface Window {
    SpeechRecognition?: {
      new (): WebSpeechRecognition;
    };
    webkitSpeechRecognition?: {
      new (): WebSpeechRecognition;
    };
  }

  interface WebSpeechResult {
    readonly isFinal: boolean;
    readonly 0: { readonly transcript: string };
  }

  interface WebSpeechResultList {
    readonly length: number;
    [index: number]: WebSpeechResult;
  }

  interface WebSpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: WebSpeechResultList;
  }

  interface WebSpeechRecognition {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    start(): void;
    stop(): void;
    onresult: ((this: WebSpeechRecognition, ev: WebSpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
    onerror: (() => void) | null;
  }
}
