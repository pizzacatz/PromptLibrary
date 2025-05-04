# MVP2: Copy & Usage Tracking

**Goal:** Enable copying prompt text to the clipboard and track usage counts.

**Best Practices:** Following prompting guidelines from the [GPT-4.1 Prompting Guide](https://cookbook.openai.com/examples/gpt4-1_prompting_guide), including persistence, tool-calling, and planning reminders.

## Overview

- **POST /prompts/:id/usage Endpoint:** Implement a server-side route to increment the usage count for a given prompt.
- **Copy Function:** Create a `copyToClipboard(promptId: string, text: string)` function that:
  - Writes the prompt text to the clipboard.
  - Sends a `POST /prompts/:id/usage` request.
- **UI Integration:** Add a Copy button next to each prompt in the UI.
- **Tooltip:** Display a transient confirmation (e.g., "Copied!") when the copy operation succeeds.
- **State Update:** Update the usage count in state or re-fetch prompts to reflect the incremented count.

## Cursor Prompt

```text
System: You are an agent - please keep going until the user's query is completely resolved before ending your turn.
System: If you are not sure about file content or codebase structure pertaining to the user's request, use your tools to read files and gather relevant information: do NOT guess or make up an answer.
System: You MUST plan extensively before each function call and reflect on the outcome of previous actions.
Task: Split the contained MVP2 section from `docs/mvpFiles.md` into its own file named `docs/mvp2-copy-usage-tracking.md`. The new file should include:
- A clear title and goal
- A Best Practices note
- A detailed overview with backend and frontend breakdown
- A Cursor Prompt as above
- Additional user acceptance criteria
- Test case scenarios
```

## Additional User Acceptance Criteria

1. Clicking the Copy button copies the prompt text to the clipboard.
2. A `POST /prompts/:id/usage` request is sent exactly once per click.
3. The prompt's usage count is incremented in the UI within 2 seconds.
4. A "Copied!" tooltip appears and auto-dismisses after a short duration.
5. No console errors occur during the copy and usage tracking flow.

## Test Cases

1. **Unit Test:** Stub `navigator.clipboard.writeText` and `fetch` to test `copyToClipboard('p1', 'Hello')` calls both correctly.
2. **Integration Test:** Render the prompt list component, simulate clicking the Copy button, and assert that:
   - `navigator.clipboard.writeText` receives the correct text.
   - `fetch('/prompts/p1/usage', { method: 'POST' })` is called.
3. **Tooltip Test:** Verify that the tooltip element appears after the button click and disappears after a timeout.
4. **Error Handling Test:** Simulate clipboard write failure and assert that an error message is displayed to the user. 