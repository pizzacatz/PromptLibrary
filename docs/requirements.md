# Project Requirements Document

## 1. Executive Summary
A lightweight, GitHub-hosted prompt library tailored for Onit sales reps to quickly store, manage, and reuse research and messaging prompts—eliminating the need to scramble through scattered documents or multiple browser tabs.

---

## 2. Business Goals & Success Metrics
- **Problem Statement:** Locating reusable AI prompts across various notes, LinkedIn posts, and browser tabs is time-consuming and frustrating.  
- **Objective:** Deliver a single-page application where reps can add, copy, and manage their most-used prompts.  
- **Success Metrics:**  
  - **Usage Frequency:** Number of “Copy” clicks per week, tracked via a simple usage counter.  
  - **User Sentiment:** Qualitative feedback from early adopters (Patrick, Zak, etc.) on ease of use and efficiency.

---

## 3. User Persona & Journey
**Primary Persona:** Onit Sales Rep  
- **Context:** Accesses the library primarily before drafting emails or messages.  
- **Pain Points:**  
  1. Wasting time searching for previously successful prompt structures.  
  2. Cognitive overload from juggling multiple open tabs.

**User Journey:**  
1. Navigate to the GitHub Pages URL.  
2. (Optional) Filter by category or tag.  
3. Click **Copy** on the desired prompt → paste into the AI tool.  
4. Add, edit, or delete prompts as needs evolve.

---

## 4. Functional Scope & MVP

| Feature             | MVP | Future |
|---------------------|:---:|:------:|
| View All Prompts    | ✅  |        |
| Copy to Clipboard   | ✅  |        |
| Add/Edit/Delete     | ✅  |        |
| Search (Ctrl+F)     | ❌  | ✅     |
| Star & Sort Prompts | ❌  | ✅     |
| Usage Analytics     | ✅  | ✅     |
| Role-Specific Sets  | ❌  | ✅     |
| Prompt Remixing     | ❌  | ✅     |
| Confidential Lock   | ❌  | ✅     |

> _Usage analytics: simple per-prompt copy counter stored in the backend._

**Out of Scope (MVP):** None explicitly; all future features are deferred.

---

## 5. Non-Functional Requirements
- **Performance:** UI actions (filter, copy) respond in under 200 ms.  
- **Scale:** Support approximately 100 prompts initially.  
- **Reliability:** Target 95 % uptime.  
- **Browser Support:** Google Chrome (desktop and mobile).  
- **Responsive Design:** Sidebar collapses on mobile for a single-column layout.  
- **Cost Constraints:** Must operate within GitHub Pages’ free tier.

---

## 6. Data & Technical Architecture

### 6.1 Data Model
Each prompt object includes:
- **id:** Unique slug or UUID  
- **category:** One of the defined v1 categories  
- **tags:** Array of tag strings  
- **text:** Prompt text containing placeholders formatted as `{{variable_name}}`  
- **variables:** List of variable names extracted from the text

### 6.2 Persistence & Backend
- Library data is served from a JSON document via a REST API.  
- CRUD endpoints:  
  - `GET /prompts`  
  - `POST /prompts`  
  - `PUT /prompts/:id`  
  - `DELETE /prompts/:id`  
- Usage tracking is handled by `POST /prompts/:id/usage`, which increments the prompt’s usage counter.  
- Possible storage options include Firebase Realtime Database, Netlify Functions with S3, or a simple Node/Express JSON server.

---

## 7. UI & Interaction Details
- **Layout:**  
  - **Sidebar:** Categories and tags for OR-mode filtering; “All” resets the filter.  
  - **Top Bar:** Search (Ctrl+F) and Sort (deferred to v2).  
  - **Main Panel:** Scrollable prompt list with Copy, Edit, and Delete controls.  
- **Empty State:** Display “No prompts found” with a “Clear filter” button.  
- **Copy Button:** Copies the raw prompt text to the clipboard and triggers a usage increment.  
- **CRUD Forms:**  
  - **Add Form:** Located at the top of the main panel; fields for category, tags, text, and variables.  
  - **Edit:** Inline toggled fields for existing prompts.  
  - **Delete:** Confirmation dialog before removal.

### Keyboard Shortcuts
| Key       | Action                          |
|-----------|---------------------------------|
| `/`       | Focus search (proxy for Ctrl+F) |
| `n`       | Focus “Add new prompt” form     |
| `↑` / `↓` | Navigate prompt list            |
| `c`       | Copy highlighted prompt         |

---

## 8. Initial Taxonomy
**Categories (v1):**  
- Research Questions  
- Email Openers  
- Follow-Ups  
- Discovery Calls  
- Objection Handling

**Tags (v1):**  
prospect, company-info, industry, deal-size, legal-team, timeline, value-prop

---

## 9. Error & Empty States
- **JSON Load Failure:** “Unable to load prompts. Retry?”  
- **No Filter Results:** “No prompts found” with a “Clear filter” option.  
- **Clipboard Error:** “Copy failed—please try again.”

---

## 10. Testing & QA
- **Manual Test Plan:**  
  - Verify CRUD operations.  
  - Confirm copy functionality and usage counter increments.  
  - Test filtering by category and tag.  
  - Ensure empty-state messaging displays correctly.  
- **Automated Tests (Optional):** Unit tests for core filtering and sorting logic (e.g., using Jest).

---

## 11. Timeline & Milestones
All weekends, targeting a June 1, 2025 launch:

| Milestone                        | Date             |
|----------------------------------|------------------|
| Wireframes & PRD Sign-off        | Sat, May 10 2025 |
| Dev Complete (CRUD + Copy + UI)  | Sat, May 17 2025 |
| QA & Bug Fixes                   | Sat, May 24 2025 |
| Stakeholder Review               | Sat, May 31 2025 |
| **MVP Launch**                   | Mon, Jun 1 2025  |

---

_End of Project Requirements Document._  
