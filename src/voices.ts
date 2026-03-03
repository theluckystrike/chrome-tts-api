/**
 * Voice Selector — List, filter, and select TTS voices
 */

export class TTSVoiceError extends Error {
    constructor(
        message: string,
        public code: string,
        public operation: string,
        public originalError?: Error
    ) {
        super(message);
        this.name = 'TTSVoiceError';
        if (originalError) {
            this.stack = originalError.stack;
        }
    }
}

export const TTSVoiceErrorCode = {
    CHROME_API_UNAVAILABLE: 'CHROME_API_UNAVAILABLE',
    GET_VOICES_FAILED: 'GET_VOICES_FAILED',
    INVALID_PARAMETER: 'INVALID_PARAMETER',
} as const;

/**
 * Validates that chrome TTS API is available
 */
function validateTTSAPI(): void {
    if (typeof chrome === 'undefined' || !chrome.tts) {
        throw new TTSVoiceError(
            'Chrome TTS API is not available. This code must run in a Chrome extension environment with "tts" permission.',
            TTSVoiceErrorCode.CHROME_API_UNAVAILABLE,
            'validateTTSAPI'
        );
    }
}

/**
 * Validates language parameter
 */
function validateLanguage(lang: string): void {
    if (typeof lang !== 'string' || lang.trim() === '') {
        throw new TTSVoiceError(
            `Invalid language code: "${lang}". Language must be a non-empty string (e.g., "en", "en-US").`,
            TTSVoiceErrorCode.INVALID_PARAMETER,
            'validateLanguage'
        );
    }
}

export class VoiceSelector {
    /** Get all available voices */
    static async getAll(): Promise<chrome.tts.TtsVoice[]> {
        validateTTSAPI();
        
        return new Promise((resolve, reject) => {
            try {
                chrome.tts.getVoices((voices) => {
                    // Sometimes getVoices can return an empty array if voices aren't loaded yet
                    // This is a known Chrome behavior - voices load asynchronously
                    if (!Array.isArray(voices)) {
                        reject(new TTSVoiceError(
                            'Failed to get TTS voices: Invalid response from chrome.tts.getVoices()',
                            TTSVoiceErrorCode.GET_VOICES_FAILED,
                            'getAll'
                        ));
                        return;
                    }
                    resolve(voices);
                });
            } catch (error) {
                reject(new TTSVoiceError(
                    `Failed to get TTS voices: ${(error as Error).message}`,
                    TTSVoiceErrorCode.GET_VOICES_FAILED,
                    'getAll',
                    error as Error
                ));
            }
        });
    }

    /** Get voices by language */
    static async getByLanguage(lang: string): Promise<chrome.tts.TtsVoice[]> {
        validateLanguage(lang);
        
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
