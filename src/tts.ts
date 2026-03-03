/**
 * TTS Manager — Text-to-speech with queue and controls
 */

export class TTSError extends Error {
    constructor(
        message: string,
        public code: string,
        public operation: string,
        public originalError?: Error
    ) {
        super(message);
        this.name = 'TTSError';
        if (originalError) {
            this.stack = originalError.stack;
        }
    }
}

export const TTSErrorCode = {
    CHROME_API_UNAVAILABLE: 'CHROME_API_UNAVAILABLE',
    SPEAK_FAILED: 'SPEAK_FAILED',
    INVALID_PARAMETER: 'INVALID_PARAMETER',
    PERMISSION_DENIED: 'PERMISSION_DENIED',
    NO_VOICE_AVAILABLE: 'NO_VOICE_AVAILABLE',
} as const;

/**
 * Validates that chrome TTS API is available
 */
function validateTTSAPI(): void {
    if (typeof chrome === 'undefined' || !chrome.tts) {
        throw new TTSError(
            'Chrome TTS API is not available. This code must run in a Chrome extension environment with "tts" permission.',
            TTSErrorCode.CHROME_API_UNAVAILABLE,
            'validateTTSAPI'
        );
    }
}

/**
 * Validates rate parameter
 */
function validateRate(rate: number): void {
    if (typeof rate !== 'number' || rate < 0.1 || rate > 10) {
        throw new TTSError(
            `Invalid rate value: ${rate}. Rate must be between 0.1 and 10.`,
            TTSErrorCode.INVALID_PARAMETER,
            'validateRate'
        );
    }
}

/**
 * Validates pitch parameter
 */
function validatePitch(pitch: number): void {
    if (typeof pitch !== 'number' || pitch < 0 || pitch > 2) {
        throw new TTSError(
            `Invalid pitch value: ${pitch}. Pitch must be between 0 and 2.`,
            TTSErrorCode.INVALID_PARAMETER,
            'validatePitch'
        );
    }
}

/**
 * Validates volume parameter
 */
function validateVolume(volume: number): void {
    if (typeof volume !== 'number' || volume < 0 || volume > 1) {
        throw new TTSError(
            `Invalid volume value: ${volume}. Volume must be between 0 and 1.`,
            TTSErrorCode.INVALID_PARAMETER,
            'validateVolume'
        );
    }
}

/**
 * Validates text parameter
 */
function validateText(text: string): void {
    if (typeof text !== 'string' || text.trim() === '') {
        throw new TTSError(
            `Invalid text: "${text}". Text must be a non-empty string.`,
            TTSErrorCode.INVALID_PARAMETER,
            'validateText'
        );
    }
}

/**
 * Validates delayMs parameter
 */
function validateDelayMs(delayMs: number): void {
    if (typeof delayMs !== 'number' || delayMs < 0 || !Number.isFinite(delayMs)) {
        throw new TTSError(
            `Invalid delayMs value: ${delayMs}. Delay must be a non-negative number.`,
            TTSErrorCode.INVALID_PARAMETER,
            'validateDelayMs'
        );
    }
}

export class TTSManager {
    private defaultRate: number; 
    private defaultPitch: number; 
    private defaultVolume: number; 
    private defaultVoice?: string;

    constructor(options?: { rate?: number; pitch?: number; volume?: number; voice?: string }) {
        // Validate constructor options
        if (options?.rate !== undefined) validateRate(options.rate);
        if (options?.pitch !== undefined) validatePitch(options.pitch);
        if (options?.volume !== undefined) validateVolume(options.volume);
        
        this.defaultRate = options?.rate || 1; 
        this.defaultPitch = options?.pitch || 1; 
        this.defaultVolume = options?.volume || 1; 
        this.defaultVoice = options?.voice;
    }

    /** Speak text */
    async speak(text: string, options?: { rate?: number; pitch?: number; volume?: number; voice?: string; lang?: string }): Promise<void> {
        validateTTSAPI();
        validateText(text);
        
        // Validate options if provided
        if (options?.rate !== undefined) validateRate(options.rate);
        if (options?.pitch !== undefined) validatePitch(options.pitch);
        if (options?.volume !== undefined) validateVolume(options.volume);

        return new Promise((resolve, reject) => {
            const speakOptions: chrome.tts.SpeakOptions = {
                rate: options?.rate || this.defaultRate, 
                pitch: options?.pitch || this.defaultPitch,
                volume: options?.volume || this.defaultVolume, 
                voiceName: options?.voice || this.defaultVoice,
                lang: options?.lang,
                onEvent: (event) => { 
                    if (event.type === 'end') resolve(); 
                    if (event.type === 'error') {
                        const errorMsg = event.errorMessage || 'Unknown TTS error';
                        if (errorMsg.includes('permission') || errorMsg.includes('denied')) {
                            reject(new TTSError(
                                `TTS permission denied: ${errorMsg}. Make sure "tts" permission is declared in manifest.json.`,
                                TTSErrorCode.PERMISSION_DENIED,
                                'speak',
                                new Error(errorMsg)
                            ));
                        } else if (errorMsg.includes('voice') || errorMsg.includes('available')) {
                            reject(new TTSError(
                                `No TTS voice available: ${errorMsg}. The requested voice may not be installed.`,
                                TTSErrorCode.NO_VOICE_AVAILABLE,
                                'speak',
                                new Error(errorMsg)
                            ));
                        } else {
                            reject(new TTSError(
                                `TTS speak failed: ${errorMsg}`,
                                TTSErrorCode.SPEAK_FAILED,
                                'speak',
                                new Error(errorMsg)
                            ));
                        }
                    }
                },
            };
            
            chrome.tts.speak(text, speakOptions);
        });
    }

    /** Speak with SSML */
    async speakSSML(ssml: string): Promise<void> {
        validateTTSAPI();
        
        if (typeof ssml !== 'string' || ssml.trim() === '') {
            throw new TTSError(
                `Invalid SSML: "${ssml}". SSML must be a non-empty string.`,
                TTSErrorCode.INVALID_PARAMETER,
                'speakSSML'
            );
        }

        return new Promise((resolve, reject) => {
            chrome.tts.speak(ssml, {
                enqueue: false,
                onEvent: (event) => { 
                    if (event.type === 'end') resolve(); 
                    if (event.type === 'error') {
                        const errorMsg = event.errorMessage || 'Unknown TTS error';
                        reject(new TTSError(
                            `TTS SSML speak failed: ${errorMsg}`,
                            TTSErrorCode.SPEAK_FAILED,
                            'speakSSML',
                            new Error(errorMsg)
                        ));
                    }
                },
            });
        });
    }

    /** Stop speaking */
    stop(): void {
        validateTTSAPI();
        chrome.tts.stop();
    }

    /** Pause */
    pause(): void {
        validateTTSAPI();
        chrome.tts.pause();
    }

    /** Resume */
    resume(): void {
        validateTTSAPI();
        chrome.tts.resume();
    }

    /** Check if speaking */
    async isSpeaking(): Promise<boolean> {
        validateTTSAPI();
        
        return new Promise((resolve) => { 
            chrome.tts.isSpeaking((speaking) => resolve(speaking)); 
        });
    }

    /** Speak a list of texts sequentially */
    async speakQueue(texts: string[], delayMs: number = 500): Promise<void> {
        if (!Array.isArray(texts) || texts.length === 0) {
            throw new TTSError(
                `Invalid texts array. Must be a non-empty array of strings.`,
                TTSErrorCode.INVALID_PARAMETER,
                'speakQueue'
            );
        }
        
        validateDelayMs(delayMs);
        
        for (const text of texts) { 
            await this.speak(text); 
            await new Promise((r) => setTimeout(r, delayMs)); 
        }
    }
}
