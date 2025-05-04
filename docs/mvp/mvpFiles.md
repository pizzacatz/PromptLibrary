# MVP Backlog

## MVP0: Environment & Pipeline Setup

**Title & Goal:** Establish a fully configured project scaffold and CI/CD pipeline.

**Must-Have Features:**

* Initialize GitHub repository with frontend and backend folders.
* Configure build scripts (npm) and linting (ESLint, Prettier).
* Set up GitHub Actions for:

  * Deploying frontend to GitHub Pages on push to `main`.
  * Deploying serverless functions for backend API.
* Include basic README with setup instructions.

**AI Build Prompt:**

> You are ChatGPT. Generate a project scaffold with `package.json`, folder structure (`/frontend`, `/backend`), ESLint and Prettier configs, and a GitHub Actions workflow that deploys frontend to GitHub Pages and backend functions to Netlify.

**AI Test Prompt:**

> You are ChatGPT. Write failing unit test stubs using Jest to verify that:
>
> 1. `npm run build` generates a `/dist` directory.
> 2. Lint checks (`npm run lint`) fail on an error in a dummy file.
> 3. GitHub Actions workflow is defined in `.github/workflows`.

**User Stories:**

* As a developer, I want the project scaffold and CI setup, so that I can start building features with automated deployment.

**BDD Scenario(s):**

```gherkin
Feature: Project setup
  Scenario: CI pipeline runs on push to main
    Given the repository is pushed to the main branch
    When the GitHub Actions workflow triggers
    Then the frontend build succeeds and is deployed to GitHub Pages
    And the backend functions are deployed successfully
```

**Done Criteria:**

* `npm run build` creates `/dist`.
* ESLint and Prettier run without errors on valid code.
* GitHub Actions passes all checks and deploys both frontend and backend.

---

## MVP1: Prompt Retrieval & Display

**Title & Goal:** Fetch prompts from the API and render them in the UI.

**Must-Have Features:**

* Implement `GET /prompts` endpoint returning static JSON.
* Frontend function to fetch prompts and store in state.
* Render a scrollable list of prompt texts.
* Display a Copy button next to each prompt (no functionality yet).

**AI Build Prompt:**

> You are ChatGPT. Write an Express.js function for `GET /prompts` that returns sample prompt data from a JSON file, and frontend JavaScript (with Fetch API) to retrieve and display this list in a `<ul>` on the page.

**AI Test Prompt:**

> You are ChatGPT. Write Jest unit test stubs to verify:
>
> 1. The `GET /prompts` endpoint returns HTTP 200 with JSON array.
> 2. `fetchPrompts()` correctly calls the endpoint and returns parsed data.

**User Stories:**

* As a sales rep, I want to see all stored prompts on page load, so that I can browse available options.

**BDD Scenario(s):**

```gherkin
Feature: View prompts
  Scenario: Display prompt list on load
    Given the backend returns three prompts
    When I open the page
    Then I see a list containing exactly three prompt items
```

**Done Criteria:**

* Tests for endpoint and `fetchPrompts()` are defined (fail initially).
* Page displays the list of prompts after successful fetch.

---

## MVP2: Copy & Usage Tracking

**Title & Goal:** Enable copying prompt text to the clipboard and track usage counts.

**Must-Have Features:**

* Implement `POST /prompts/:id/usage` to increment usage.
* Frontend Copy button calls `navigator.clipboard.writeText(text)`.
* On click, also call usage endpoint.
* Show temporary confirmation (e.g. “Copied!” tooltip).

**AI Build Prompt:**

> You are ChatGPT. Implement a `copyToClipboard(promptId, text)` function that writes `text` to the clipboard and sends a `POST /prompts/:id/usage` request. Also add a transient tooltip UI.

**AI Test Prompt:**

> You are ChatGPT. Write Jest test stubs for `copyToClipboard` to assert:
>
> 1. `navigator.clipboard.writeText` is called with correct text.
> 2. `fetch('/prompts/:id/usage', { method: 'POST' })` is called.

**User Stories:**

* As a sales rep, I want to copy a prompt and automatically increment its usage, so that I can track which prompts I use most.

**BDD Scenario(s):**

```gherkin
Feature: Copy prompt
  Scenario: Copy and track usage
    Given a prompt with id "p1" is displayed
    When I click its Copy button
    Then the prompt text is copied to the clipboard
    And a POST request is sent to /prompts/p1/usage
```

**Done Criteria:**

* `copyToClipboard` tests exist and fail initially.
* Clicking Copy copies text and triggers usage API.
* Tooltip appears on success.

---

## MVP3: Add Prompt Functionality

**Title & Goal:** Allow users to create new prompts via a form.

**Must-Have Features:**

* Add form with inputs for category, tags, text, and variables.
* Submit form sends `POST /prompts` with JSON body.
* On success, append the new prompt to the list.

**AI Build Prompt:**

> You are ChatGPT. Generate HTML form markup and JavaScript logic to capture form data, send `POST /prompts` with correct JSON payload, and update the displayed prompt list upon success.

**AI Test Prompt:**

> You are ChatGPT. Write Jest test stubs for `createPrompt(data)` to verify:
>
> 1. It sends a POST to `/prompts` with the form data.
> 2. It returns the newly created prompt object.

**User Stories:**

* As a sales rep, I want to add new prompts, so that I can store fresh prompt templates directly in the app.

**BDD Scenario(s):**

```gherkin
Feature: Add prompt
  Scenario: User creates a new prompt
    Given the user fills out the Add Prompt form with valid data
    When they submit the form
    Then a POST request is sent to /prompts
    And the new prompt appears at the end of the list
```

**Done Criteria:**

* `createPrompt` tests exist and fail initially.
* Submitting the form posts data and updates the UI with the new prompt.

---

## MVP4: Edit & Delete Prompts

**Title & Goal:** Enable modification and removal of existing prompts.

**Must-Have Features:**

* Edit button toggles an inline form to update prompt fields.
* Save sends `PUT /prompts/:id` and refreshes the item.
* Delete button opens a confirmation dialog.
* Confirming deletion sends `DELETE /prompts/:id` and removes the item.

**AI Build Prompt:**

> You are ChatGPT. Implement `editPrompt(id, updates)` and `deletePrompt(id)` functions, inline form toggling, confirmation dialog, and UI updates on success.

**AI Test Prompt:**

> You are ChatGPT. Write Jest test stubs for:
>
> 1. `editPrompt` to ensure it sends a PUT with correct body.
> 2. `deletePrompt` to ensure it sends a DELETE and removes the prompt from state.

**User Stories:**

* As a sales rep, I want to edit existing prompts, so that I can refine them.
* As a sales rep, I want to delete prompts I no longer use, so that my library stays relevant.

**BDD Scenario(s):**

```gherkin
Feature: Edit and delete prompts
  Scenario: User edits a prompt
    Given a prompt is displayed with text "Old"
    When the user clicks Edit, changes text to "New", and saves
    Then a PUT request is sent to /prompts/:id with updated text
    And the prompt text updates to "New" in the list

  Scenario: User deletes a prompt
    Given a prompt is displayed
    When the user clicks Delete and confirms
    Then a DELETE request is sent to /prompts/:id
    And the prompt is removed from the list
```

**Done Criteria:**

* Tests for `editPrompt` and `deletePrompt` exist and fail initially.
* Inline edit and confirmation flows invoke correct API and update UI.

---

## MVP5: Category & Tag Filtering

**Title & Goal:** Provide sidebar filters so users can narrow prompts by category or tag.

**Must-Have Features:**

* Render a list of categories and tags in the sidebar.
* Clicking a category or tag filters the prompt list with OR logic.
* All option clears any filter.

**AI Build Prompt:**

> You are ChatGPT. Build sidebar UI listing dynamic categories and tags, and implement `filterPrompts(criteria)` to show only matching prompts.

**AI Test Prompt:**

> You are ChatGPT. Write Jest test stubs for `filterPrompts` verifying:
>
> 1. Filtering by a single category returns only prompts in that category.
> 2. Filtering by a tag returns only prompts containing that tag.
> 3. Clearing filter returns full list.

**User Stories:**

* As a sales rep, I want to filter prompts by category, so that I can quickly focus on relevant types.
* As a sales rep, I want to filter by tag, so that I can find prompts matching specific keywords.

**BDD Scenario(s):**

```gherkin
Feature: Filter prompts
  Scenario: Filter by category
    Given 5 prompts loaded across 2 categories
    When I click the “Research Questions” category
    Then only prompts in “Research Questions” are displayed

  Scenario: Filter by tag
    Given prompts with various tags
    When I click the “industry” tag
    Then only prompts tagged “industry” appear
```

**Done Criteria:**

* `filterPrompts` tests exist and fail initially.
* Sidebar filters dynamically load and correctly filter the UI.

---

## Deferred / Nice-to-Have

* Full-text Search UI: Replace Ctrl+F with an integrated search bar.
* Starring & Sort: User favorites and reorders prompts.
* Keyboard Shortcuts Implementation: Bind keys for navigation and actions.
* Role-Specific Libraries: Scoped views per user role.
* Prompt Remixing Tool: Interactive remixing of existing prompts.
* Analytics Dashboard: Aggregate and visualize usage metrics.
* Collaboration & Access Control: Multi-user editing and permissions.

*End of MVP Backlog.*
