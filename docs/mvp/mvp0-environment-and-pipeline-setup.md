# MVP0: Environment & Pipeline Setup

**Goal:** Establish a fully configured project scaffold and CI/CD pipeline for both frontend and backend.

## Overview

This MVP covers the initial setup of the codebase and automated workflows:

- **Repository Structure**: Initialize a Git repository containing two top-level folders:
  - `frontend/` for the React client
  - `backend/` for serverless functions or API code
- **Build & Lint Scripts**:
  - Configure `package.json` with scripts:
    - `npm run build` → creates `dist/` artifacts
    - `npm run lint` → runs ESLint and Prettier checks
  - Add ESLint (`.eslintrc.json`) and Prettier (`.prettierrc`) config files
- **Continuous Integration & Deployment**:
  - Set up GitHub Actions workflows in `.github/workflows/`:
    - `deploy-frontend.yml`: on push to `main`, build and deploy `frontend/` to GitHub Pages
    - `deploy-backend.yml`: on push to `main`, package and deploy `backend/` functions (e.g., Netlify or Serverless)
- **Documentation**:
  - Include a `README.md` at project root with clear setup, build, and deploy instructions

## Additional User Acceptance Criteria

1. The repository root shows `frontend/` and `backend/` directories.
2. Running `npm run build` in each folder creates a `dist/` directory with production-ready artifacts.
3. ESLint and Prettier configurations live at the project root and pass `npm run lint` without errors.
4. GitHub Actions workflows exist under `.github/workflows/` and successfully trigger on `main` branch pushes.
5. The `README.md` contains accurate setup and deploy steps for both environments.

## Test Cases

1. **Build Script Test**
   - Stub a Jest test that runs `npm run build` in both `frontend/` and `backend/` and asserts `dist/` exists.
2. **Linting Test**
   - Create a dummy file with lint errors, run `npm run lint`, and assert the command exits with a non-zero status.
3. **CI Workflow Existence**
   - Write a test to verify `.github/workflows/deploy-frontend.yml` and `deploy-backend.yml` exist and contain expected job definitions.
4. **Documentation Verification**
   - Stub a test to check that `README.md` includes sections for setup, build, and deploy instructions.

</rewritten_file> 