# Prompt Library

A modern web application for storing, retrieving, and managing useful prompts for AI systems.

[![Frontend Deployment](https://github.com/user/prompt-library/actions/workflows/deploy-frontend.yml/badge.svg)](https://github.com/user/prompt-library/actions/workflows/deploy-frontend.yml)
[![Backend Deployment](https://github.com/user/prompt-library/actions/workflows/deploy-backend.yml/badge.svg)](https://github.com/user/prompt-library/actions/workflows/deploy-backend.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Project Structure

This is a TypeScript monorepo containing:

- `frontend/` - React client application built with Vite
- `backend/` - Express serverless API for AWS Lambda/Netlify Functions
- `__tests__/` - Common test files
- `.github/workflows/` - CI/CD pipeline configuration

## Prerequisites

- Node.js 18+
- npm 9+

## Quick Start

```bash
# Clone the repository
git clone https://github.com/username/prompt-library.git
cd prompt-library

# Install all dependencies (monorepo)
npm install

# Set up environment variables
cp .env.example .env

# Start frontend development server
npm run dev:frontend

# In another terminal, start backend development server
npm run dev:backend
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8888/api

## Development

### Available Scripts

```bash
# Start frontend development server
npm run dev:frontend

# Start backend development server
npm run dev:backend

# Build both frontend and backend
npm run build

# Run linting on all projects
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Type check
npm run typecheck
```

### Environment Variables

The default configuration is suitable for local development, but you may need to configure:

- `PORT` - Backend server port (default: 3000)
- `VITE_API_URL` - Frontend API URL (default: http://localhost:3000/api)
- `NETLIFY_AUTH_TOKEN` - For automated deployments
- `NETLIFY_SITE_ID` - For automated deployments

## Testing

Tests are written using Jest:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test suites
npm test -- --selectProjects=frontend
npm test -- --selectProjects=backend
```

## Continuous Integration & Deployment

GitHub Actions workflow files are located in `.github/workflows/`:

- `deploy-frontend.yml`: On push to `main`, deploys frontend to GitHub Pages
- `deploy-backend.yml`: On push to `main`, deploys backend to Netlify

## Manual Deployment

### Frontend

```bash
cd frontend
npm run build
# Deploy the dist/ directory to your hosting provider
```

### Backend

```bash
cd backend
npm run deploy # Deploys via Serverless Framework
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 