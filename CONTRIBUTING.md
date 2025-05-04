# Contributing to Prompt Library

Thank you for considering contributing to the Prompt Library project! This document provides guidelines and instructions for contribution.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read and follow it to ensure a positive experience for everyone.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally.
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Setup Environment**:
   Copy `.env.example` to `.env` and configure as needed.
   ```bash
   cp .env.example .env
   ```

## Development Workflow

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write code that follows the established code style.
   - Add tests as appropriate.
   - Update documentation if necessary.

3. **Run tests and linting**:
   ```bash
   npm run lint
   npm test
   ```

4. **Commit your changes**:
   Use clear commit messages that follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:
   ```
   type(scope): description
   ```
   For example:
   ```
   feat(prompt): add search functionality
   fix(auth): resolve login issue
   docs(readme): update installation instructions
   ```

5. **Push to your fork**.

6. **Create a Pull Request** to the main repository.

## Pull Request Process

1. Ensure your PR has a clear description of the changes and why they're needed.
2. Link any related issues.
3. Include screenshots or code examples if applicable.
4. Make sure all CI checks pass.
5. Wait for a maintainer to review your PR and address any feedback.

## Project Structure

- `frontend/` - React client application
- `backend/` - Express serverless API
- `__tests__/` - Common test files
- `.github/workflows/` - CI/CD pipelines

## Code Style

This project uses ESLint and Prettier for code formatting and linting. Please ensure your code follows these standards:

- Use TypeScript for type safety.
- Follow the established code style in existing files.
- Use descriptive variable and function names.
- Write clear comments when necessary.

## Testing

- Write test cases for new features and bug fixes.
- Ensure tests are passing before submitting a PR.
- Use the existing testing patterns as a guide.

## Documentation

- Update the README.md and other documentation as needed.
- Document new features, configuration options, or APIs.

## License

By contributing to this project, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to the Prompt Library project! 