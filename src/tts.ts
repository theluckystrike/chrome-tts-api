/**
 * TTS Manager — Text-to-speech with queue and controls
 */
export class TTSManager {
    private defaultRate: number; private defaultPitch: number; private defaultVolume: number; private defaultVoice?: string;

    constructor(options?: { rate?: number; pitch?: number; volume?: number; voice?: string }) {
        this.defaultRate = options?.rate || 1; this.defaultPitch = options?.pitch || 1; this.defaultVolume = options?.volume || 1; this.defaultVoice = options?.voice;
    }

    /** Speak text */
    async speak(text: string, options?: { rate?: number; pitch?: number; volume?: number; voice?: string; lang?: string }): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.tts.speak(text, {
                rate: options?.rate || this.defaultRate, pitch: options?.pitch || this.defaultPitch,
                volume: options?.volume || this.defaultVolume, voiceName: options?.voice || this.defaultVoice,
                lang: options?.lang,
                onEvent: (event) => { if (event.type === 'end') resolve(); if (event.type === 'error') reject(new Error(event.errorMessage)); },
            });
        });
    }

    /** Speak with SSML */
    async speakSSML(ssml: string): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.tts.speak(ssml, {
                onEvent: (event) => { if (event.type === 'end') resolve(); if (event.type === 'error') reject(new Error(event.errorMessage)); },
            });
        });
    }

    /** Stop speaking */
    stop(): void { chrome.tts.stop(); }

    /** Pause */
    pause(): void { chrome.tts.pause(); }

    /** Resume */
    resume(): void { chrome.tts.resume(); }

    /** Check if speaking */
    async isSpeaking(): Promise<boolean> { return new Promise((resolve) => { chrome.tts.isSpeaking((speaking) => resolve(speaking)); }); }

    /** Speak a list of texts sequentially */
    async speakQueue(texts: string[], delayMs: number = 500): Promise<void> {
        for (const text of texts) { await this.speak(text); await new Promise((r) => setTimeout(r, delayMs)); }
    }
}
