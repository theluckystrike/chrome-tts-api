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

Part of the [Zovo](https://zovo.one) developer tools family.

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

## Usage

```javascript
import { speak } from 'chrome-tts-api';

// Speak text
await speak('Hello, world!');

// Speed test
await speak('Speed test', { rate: 2.0 });

// Stop speaking
import { stop } from 'chrome-tts-api';
await stop();

// Get available voices
import { getVoices } from 'chrome-tts-api';
const voices = await getVoices();
```

## API

| Method | Description |
|--------|-------------|
| `speak(text, options)` | Speak text |
| `stop()` | Stop speaking |
| `getVoices()` | Get available voices |

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/tts-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/tts-feature`
7. **Submit** a Pull Request

## See Also

### Related Zovo Repositories

- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage
- [webext-toast-notifications](https://github.com/theluckystrike/webext-toast-notifications) - Notifications

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)
