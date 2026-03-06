# chrome-tts-api

A TypeScript wrapper for the Chrome Text-to-Speech API, designed for Chrome extensions using Manifest V3.

## Installation

```bash
npm install chrome-tts-api
```

## API Overview

This library provides two main classes: `TTSManager` for text-to-speech playback and control, and `VoiceSelector` for discovering and filtering available voices.

## TTSManager

The `TTSManager` class handles text-to-speech playback with queue support and playback controls.

### Constructor

```typescript
new TTSManager(options?: {
    rate?: number;      // Speech rate (default: 1)
    pitch?: number;     // Speech pitch (default: 1)
    volume?: number;    // Speech volume (default: 1)
    voice?: string;     // Voice name to use
})
```

### Methods

`speak(text: string, options?: SpeechOptions): Promise<void>`

Speaks the given text with optional overrides for rate, pitch, volume, voice, and language.

`speakSSML(ssml: string): Promise<void>`

Speaks SSML-marked text for advanced speech synthesis.

`stop(): void`

Stops any ongoing speech immediately.

`pause(): void`

Pauses speech playback.

`resume(): void`

Resumes paused speech.

`isSpeaking(): Promise<boolean>`

Returns whether speech is currently in progress.

`speakQueue(texts: string[], delayMs?: number): Promise<void>`

Speaks an array of texts sequentially with a delay between each utterance.

## VoiceSelector

The `VoiceSelector` class provides static methods for discovering and filtering available voices.

### Methods

`getAll(): Promise<TtsVoice[]>`

Returns all available voices.

`getByLanguage(lang: string): Promise<TtsVoice[]>`

Returns voices for a specific language code (e.g., "en", "es", "fr").

`getRemote(): Promise<TtsVoice[]>`

Returns cloud-based (remote) voices.

`getLocal(): Promise<TtsVoice[]>`

Returns local device voices.

`getLanguages(): Promise<string[]>`

Returns all available language codes.

## Usage Examples

### Basic Speech

```typescript
import { TTSManager } from 'chrome-tts-api';

const tts = new TTSManager();
await tts.speak('Hello, world!');
```

### Custom Voice Settings

```typescript
const tts = new TTSManager({ rate: 1.5, volume: 0.8 });
await tts.speak('Speaking faster and quieter');
```

### Voice Selection

```typescript
import { VoiceSelector } from 'chrome-tts-api';

// Get all available voices
const voices = await VoiceSelector.getAll();

// Filter by language
const englishVoices = await VoiceSelector.getByLanguage('en');

// Get only local voices
const localVoices = await VoiceSelector.getLocal();

// Use a specific voice
const tts = new TTSManager({ voice: 'Google US English' });
await tts.speak('Hello with a specific voice');
```

### Queue Multiple Utterances

```typescript
const tts = new TTSManager();
await tts.speakQueue([
    'First message',
    'Second message',
    'Third message'
], 500); // 500ms delay between messages
```

### Playback Control

```typescript
const tts = new TTSManager();

// Start speaking
await tts.speak('Long text...');

// Later, control playback
tts.pause();    // Pause
tts.resume();   // Resume
tts.stop();     // Stop completely

// Check status
const speaking = await tts.isSpeaking();
```

### SSML Support

```typescript
const tts = new TTSManager();
await tts.speakSSML('<speak>Hello <emphasis level="strong">world</emphasis></speak>');
```

## Requirements

- Chrome browser with extension context
- Manifest V3 extension
- Chrome TTS API available in extension runtime

## Related

This library is part of the theluckystrike Chrome extension utilities. For more projects, visit the GitHub profile at https://github.com/theluckystrike

Learn more about Chrome extensions at https://developer.chrome.com/docs/extensions/

## License

MIT License
