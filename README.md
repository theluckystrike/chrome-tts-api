# chrome-tts-api

[![npm version](https://img.shields.io/npm/v/chrome-tts-api)](https://npmjs.com/package/chrome-tts-api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-tts-api/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-tts-api/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-tts-api?style=social)](https://github.com/theluckystrike/chrome-tts-api)

> Text-to-Speech API wrapper for Chrome extensions.

**chrome-tts-api** provides utilities for text-to-speech functionality in Chrome extensions. Part of the Zovo Chrome extension utilities.

<p align="center">
  <a href="https://zovo.one">
    <img src="https://img.shields.io/badge/Visit-Zovo-orange?style=for-the-badge" alt="Zovo">
  </a>
  <a href="https://chrome.google.com/webstore/search/publishers/zovo">
    <img src="https://img.shields.io/badge/Chrome_Web_Store-18%2B%20Extensions-green?style=for-the-badge" alt="Chrome Web Store">
  </a>
</p>

## Features

- ✅ **Text-to-Speech** - Convert text to speech
- ✅ **Voice Selection** - Choose from available voices
- ✅ **Speed Control** - Adjust speech rate
- ✅ **Event Handling** - Track speech events
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install chrome-tts-api
```

Or with yarn:

```bash
yarn add chrome-tts-api
```

## Usage

```javascript
import { TTSManager } from 'chrome-tts-api';

// Create a TTS manager instance
const tts = new TTSManager();

// Speak text
await tts.speak('Hello, world!');

// Speak with options
await tts.speak('Speed test', { rate: 2.0 });

// Stop speaking
tts.stop();

// Pause and resume
tts.pause();
tts.resume();

// Check if speaking
const isSpeaking = await tts.isSpeaking();

// Get available voices
import { VoiceSelector } from 'chrome-tts-api';
const selector = new VoiceSelector();
const voices = await selector.getVoices();
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rate` | `number` | `1.0` | Speech rate (0.1 to 10) |
| `pitch` | `number` | `1.0` | Speech pitch (0 to 2) |
| `volume` | `number` | `1.0` | Speech volume (0 to 1) |
| `voice` | `string` | - | Voice name to use |

## API

| Method | Description |
|--------|-------------|
| `speak(text, options)` | Speak text with optional options |
| `stop()` | Stop speaking |
| `getVoices()` | Get available voices |
| `pause()` | Pause speech |
| `resume()` | Resume speech |

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/tts-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/tts-feature`
7. **Submit** a Pull Request

### Development

```bash
# Clone the repository
git clone https://github.com/theluckystrike/chrome-tts-api.git
cd chrome-tts-api

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## See Also

### Related Zovo Repositories

- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage wrapper
- [webext-toast-notifications](https://github.com/theluckystrike/webext-toast-notifications) - Toast notification system
- [chrome-window-manager](https://github.com/theluckystrike/chrome-window-manager) - Window management utilities
- [webext-bridge](https://github.com/theluckystrike/webext-bridge) - Message passing between contexts

### Zovo Chrome Extensions

| Extension | Description | Chrome Web Store |
|-----------|-------------|------------------|
| [Tab Suspender Pro](https://chrome.google.com/webstore/detail/tab-suspender-pro) | Suspend inactive tabs to save memory | [Install](https://chrome.google.com/webstore/detail/tab-suspender-pro) |
| [Cookie Manager Pro](https://chrome.google.com/webstore/detail/cookie-manager-pro) | Advanced cookie management | [Install](https://chrome.google.com/webstore/detail/cookie-manager-pro) |
| [Clipboard History Pro](https://chrome.google.com/webstore/detail/clipboard-history-pro) | Advanced clipboard management | [Install](https://chrome.google.com/webstore/detail/clipboard-history-pro) |
| [JSON Viewer Pro](https://chrome.google.com/webstore/detail/json-viewer-pro) | Format and explore JSON | [Install](https://chrome.google.com/webstore/detail/json-viewer-pro) |

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)
