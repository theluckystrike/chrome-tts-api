/**
 * Voice Selector — List, filter, and select TTS voices
 */
export class VoiceSelector {
    /** Get all available voices */
    static async getAll(): Promise<chrome.tts.TtsVoice[]> {
        return new Promise((resolve) => { chrome.tts.getVoices((voices) => resolve(voices)); });
    }

    /** Get voices by language */
    static async getByLanguage(lang: string): Promise<chrome.tts.TtsVoice[]> {
        const all = await this.getAll();
        return all.filter((v) => v.lang?.startsWith(lang));
    }

    /** Get remote (cloud) voices */
    static async getRemote(): Promise<chrome.tts.TtsVoice[]> {
        const all = await this.getAll();
        return all.filter((v) => v.remote);
    }

    /** Get local voices */
    static async getLocal(): Promise<chrome.tts.TtsVoice[]> {
        const all = await this.getAll();
        return all.filter((v) => !v.remote);
    }

    /** Get all available languages */
    static async getLanguages(): Promise<string[]> {
        const all = await this.getAll();
        return [...new Set(all.map((v) => v.lang).filter((l): l is string => !!l))];
    }
}
