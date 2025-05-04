# MVP3: Add Prompt Functionality

**Goal:** Allow users to create new prompts via a form and update the prompt list.

**Best Practices:** Following prompting guidelines from the [GPT-4.1 Prompting Guide](https://cookbook.openai.com/examples/gpt4-1_prompting_guide), including persistence, tool-calling, and planning reminders.

## Overview

- **Add Prompt Form:** Build a form with fields for:
  - Category (select)
  - Tags (multi-select or comma-separated input)
  - Prompt Text (textarea)
  - Variables (optional comma-separated input)
- **Form Submission:** Implement a `createPrompt(data)` function that:
  - Sends a `POST /prompts` request with JSON body `{ category, tags, text, variables }`.
  - Receives the new prompt object from the response.
- **UI Update:** Append the newly created prompt to the existing prompt list in the UI without full page reload.
- **Validation:** Ensure the form validates required fields (category, text) before submission.

## Cursor Prompt

```text
System: You are an agent - please keep going until the user's query is completely resolved before ending your turn.
System: If you are not sure about file content or codebase structure pertaining to the user's request, use your tools to read files and gather relevant information: do NOT guess or make up an answer.
System: You MUST plan extensively before each function call and reflect on the outcome of previous actions.
Task: Split the contained MVP3 section from `docs/mvpFiles.md` into its own file named `docs/mvp3-add-prompt-functionality.md`. The new file should include:
- A clear title and goal
- A Best Practices note
- A detailed overview with form structure and API interaction
- A Cursor Prompt as above
- Additional user acceptance criteria
- Test case scenarios
```

## Additional User Acceptance Criteria

1. The Add Prompt form is accessible via an "Add Prompt" button or route.
2. Required fields (category, text) show validation errors when empty.
3. On successful submission, the new prompt appears at the bottom of the prompt list.
4. The form clears after successful submission.
5. Error messages display to the user if the API request fails.

## Test Cases

1. **Unit Test for createPrompt:** Mock `fetch` to test that `createPrompt({ category, tags, text, variables })`:
   - Sends a `POST /prompts` request with the correct JSON payload.
   - Resolves with the new prompt object.
2. **Form Validation Test:** Render the Add Prompt form, submit empty required fields, and assert validation messages appear.
3. **Integration Test:** Fill the form fields, mock the API response, submit, and assert the prompt list length increases by 1.
4. **Error Handling Test:** Mock the API to return an error status, submit the form, and assert an error message is displayed. 