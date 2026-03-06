# Contributing to chrome-tts-api

Thank you for your interest in contributing. This document outlines the process for contributing to this project.

## Reporting Issues

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce the issue
- Your environment details (Chrome version, OS, Node version)
- Any relevant error messages or logs

Please check existing issues before creating a new one to avoid duplicates.

## Development Workflow

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch from `main`
4. Make your changes
5. Test your changes
6. Commit with a clear message
7. Push to your fork
8. Submit a Pull Request

### Getting Started

```bash
git clone https://github.com/theluckystrike/chrome-tts-api.git
cd chrome-tts-api
npm install
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## Code Style

This project uses TypeScript. Please ensure:

- Code follows the existing style in the source files
- TypeScript strict mode is enabled
- Run `npm run build` before committing to ensure no type errors
- Keep functions focused and modular

## Testing

Write tests for new features and ensure existing tests pass before submitting a Pull Request.

## License

By contributing to chrome-tts-api, you agree that your contributions will be licensed under the MIT License.
