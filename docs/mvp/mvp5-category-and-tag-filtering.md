# MVP5: Category & Tag Filtering

**Goal:** Provide sidebar filters so users can narrow down prompts by category or tag for quick focused access.

**Best Practices:** Following prompting guidelines from the [GPT-4.1 Prompting Guide](https://cookbook.openai.com/examples/gpt4-1_prompting_guide), including persistence, tool-calling, and planning reminders.

## Overview

- **Sidebar UI**: Render a sidebar listing all available categories (e.g., Research Questions, Email Openers) and tags dynamically based on the prompt dataset.
- **Filter Function**: Implement `filterPrompts(criteria: { category?: string; tags?: string[] })` to filter the prompt list by the selected criteria using OR logic for tags and single select for category.
- **Clear Filters**: Provide an "All" option to clear any active filters and show the complete prompt list.
- **State Management**: Store filter criteria in component state and apply to the prompt list rendering.
- **UI Feedback**: Highlight the active filter and provide a badge count of prompts per filter option.

## Cursor Prompt

```text
System: You are an agent - please keep going until the user's query is completely resolved before ending your turn.
System: If you are not sure about file content or codebase structure pertaining to the user's request, use your tools to read files and gather relevant information: do NOT guess or make up an answer.
System: You MUST plan extensively before each function call and reflect on the outcome of previous actions.
Task: Split the contained MVP5 section from `docs/mvpFiles.md` into its own file named `docs/mvp5-category-and-tag-filtering.md`. The new file should include:
- A clear title and goal
- A Best Practices note
- A detailed overview with sidebar, filterPrompts logic, clear filters, and UI feedback
- A Cursor Prompt as above
- Additional user acceptance criteria
- Test case scenarios
```

## Additional User Acceptance Criteria

1. Clicking a category displays only prompts belonging to that category.
2. Clicking a tag displays prompts tagged with that tag, regardless of category.
3. Multiple tag selections filter prompts containing any of the selected tags (OR logic).
4. Clicking "All" clears all filters and shows the full list.
5. Active filter options are visually highlighted, and display the count of matching prompts.
6. No console errors should occur during filtering actions.

## Test Cases

1. **Unit Test for `filterPrompts`**:
   - Test filtering by single category returns correct subset.
   - Test filtering by single tag returns correct subset.
   - Test filtering by multiple tags returns combined subsets (OR logic).
2. **Integration Test**:
   - Render the UI with multiple prompts, simulate filter clicks, and assert the correct items are displayed.
3. **Clear Filters Test**:
   - Simulate applying filters and then clicking "All", and assert the full list is shown.
4. **UI Feedback Test**:
   - Check that selected filter options have appropriate highlighting and badge counts. 