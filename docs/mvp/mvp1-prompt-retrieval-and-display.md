# MVP1: Prompt Retrieval & Display

**Goal:** Fetch prompts from the backend API and render them in the UI.

**Best Practices:** Following prompting guidelines from the [GPT-4.1 Prompting Guide](https://cookbook.openai.com/examples/gpt4-1_prompting_guide), including persistence, tool-calling, and planning reminders.

## Overview

- **GET /prompts Endpoint**: Implement a server-side route (e.g., Express.js `GET /prompts`) that returns an array of prompt objects in JSON format.
- **Frontend Integration**: Create a `fetchPrompts()` function using the Fetch API to call `/prompts` and retrieve prompt data.
- **State Management**: Store the fetched prompts in component state (e.g., React `useState` or global store).
- **UI Rendering**: Render a scrollable list (`<ul>`) displaying each prompt's text.
- **Copy Button Placeholder**: Display a Copy button next to each prompt item (no functionality yet).

## Cursor Prompt

```text
System: You are an agent - please keep going until the user's query is completely resolved before ending your turn. Only terminate when you are sure the task is complete.
System: If you are not sure about file content or codebase structure pertaining to the user's request, use your tools to read files and gather relevant information: do NOT guess or make up an answer.
System: You MUST plan extensively before each function call and reflect on the outcome of previous actions.
Task: Split the contained MVP1 section from `docs/mvpFiles.md` into its own file named `docs/mvp1-prompt-retrieval-and-display.md`. The new file should include:
- A clear title and goal
- A detailed overview with feature breakdown (backend and frontend)
- A Cursor Prompt as above
- Additional user acceptance criteria
- Test case scenarios
```

## Additional User Acceptance Criteria

1. The `/prompts` endpoint responds with HTTP 200 and returns a JSON array of objects with shape `{ id, category, tags, text, usageCount }`.
2. On application load, `fetchPrompts()` is called automatically and populates the prompt list.
3. The UI displays each prompt's text with a Copy button next to it.
4. No console errors occur during data fetching and rendering.
5. The UI is responsive and the list scrolls properly on smaller viewports.

## Test Cases

1. **Endpoint Test**: Write a Jest test stub for `GET /prompts` to assert status 200 and correct JSON shape.
2. **Unit Test**: Test `fetchPrompts()` by mocking the fetch call and validating it returns the parsed prompt array.
3. **Integration Test**: Render the prompt list component with a mocked API response and assert the correct number of `<li>` items are displayed.
4. **Snapshot Test**: Take a snapshot of the prompt list UI to detect unintended changes. 