# chrome-tts-api

Text-to-Speech API wrapper for Chrome extensions.

## Overview

chrome-tts-api provides utilities for text-to-speech functionality in Chrome extensions.

## Installation

```bash
npm install chrome-tts-api
```

## Usage

```javascript
import { speak } from 'chrome-tts-api';

await speak('Hello, world!');

await speak('Speed test', { rate: 2.0 });
```

## API

- `speak(text, options)` - Speak text
- `stop()` - Stop speaking
- `getVoices()` - Get available voices

## License

MIT
