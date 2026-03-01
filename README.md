# chrome-tts-api — Text-to-Speech for Chrome Extensions
> **Built by [Zovo](https://zovo.one)**

Speak text, SSML, queue utterances, pause/resume, and select voices. `npm i chrome-tts-api`

```typescript
import { TTSManager, VoiceSelector } from 'chrome-tts-api';
const tts = new TTSManager({ rate: 1.2 });
await tts.speak('Hello world!');
const voices = await VoiceSelector.getByLanguage('en');
```
MIT License
