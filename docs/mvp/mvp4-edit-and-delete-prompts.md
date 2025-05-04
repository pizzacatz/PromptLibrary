# MVP4: Edit & Delete Prompts

**Goal:** Enable modification and removal of existing prompts to keep the library up-to-date and relevant.

**Best Practices:** Following prompting guidelines from the [GPT-4.1 Prompting Guide](https://cookbook.openai.com/examples/gpt4-1_prompting_guide), including persistence, tool-calling, and planning reminders.

## Overview

- **Inline Edit Form:** Add an Edit button for each prompt that toggles an inline form pre-filled with the prompt's current fields (category, tags, text, variables).
- **Edit Function:** Implement `editPrompt(id: string, updates: Partial<Prompt>)` to send a `PUT /prompts/:id` request with the updated fields.
- **Cancel Edit:** Allow users to cancel editing and revert the form back to view mode without applying changes.
- **Delete Confirmation:** Add a Delete button that opens a modal confirmation dialog to prevent accidental deletions.
- **Delete Function:** Implement `deletePrompt(id: string)` to send a `DELETE /prompts/:id` request and remove the prompt.
- **UI Updates:** On successful edit or delete, update the client-side state to reflect the changes (update the list item or remove it).

## Cursor Prompt

```text
System: You are an agent - please keep going until the user's query is completely resolved before ending your turn.
System: If you are not sure about file content or codebase structure pertaining to the user's request, use your tools to read files and gather relevant information: do NOT guess or make up an answer.
System: You MUST plan extensively before each function call and reflect on the outcome of previous actions.
Task: Split the contained MVP4 section from `docs/mvpFiles.md` into its own file named `docs/mvp4-edit-and-delete-prompts.md`. The new file should include:
- A clear title and goal
- An overview with inline edit, editPrompt, cancel, deletePrompt, and UI update details
- A Best Practices note
- A Cursor Prompt as above
- Additional user acceptance criteria
- Test case scenarios
```

## Additional User Acceptance Criteria

1. Clicking the **Edit** button toggles an inline form populated with the prompt's existing data.
2. Saving edits sends a `PUT /prompts/:id` request and updates the prompt text in the list without page reload.
3. Canceling an edit closes the inline form and restores the original display without API calls.
4. Clicking the **Delete** button opens a confirmation modal.
5. Confirming deletion sends a `DELETE /prompts/:id` request and removes the prompt from the UI.
6. No console errors occur during edit or delete operations.

## Test Cases

1. **Unit Test for `editPrompt`**: Mock `fetch` to ensure `PUT /prompts/:id` is called with the correct payload when saving edits.
2. **Integration Edit Test**: Render the prompt list, simulate clicking **Edit**, change the text field, click **Save**, and assert that the updated text appears.
3. **Cancel Edit Test**: Simulate clicking **Edit**, then **Cancel**, and verify no API call is made and the original prompt is shown.
4. **Unit Test for `deletePrompt`**: Mock `fetch` to verify `DELETE /prompts/:id` is called when deletion is confirmed.
5. **Integration Delete Test**: Render the prompt list, simulate delete confirmation, and assert the prompt count decreases by one. 