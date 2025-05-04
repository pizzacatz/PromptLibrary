# Solution Design Document

## 1. Introduction

This document describes the end-to-end solution design for the single-page Prompt Library MVP tailored for Onit sales reps.

## 2. Architecture Overview

**Client (Browser)**

* Vanilla HTML/CSS/JS application fetched from GitHub Pages.
* Renders UI, manages in-memory state, handles user interactions, and calls backend APIs.

**Backend API**

* RESTful JSON API via serverless functions (e.g., Netlify or Firebase Functions).
* Serves prompts JSON and handles CRUD and usage endpoints.

**Data Storage**

* Prompts stored in a JSON document (e.g., S3 or Firebase RTDB).
* Usage counters and modifications persisted via the backend.

```
+------------+    <--HTTPS-->   +---------------+    <-->   +------------+
|   Browser  |                 |  Backend API   |         |   Storage  |
+------------+                 +---------------+         +------------+
```

## 3. Data Model

### Prompt Object

```json
{
  "id": "string",          // slug or UUID
  "category": "string",
  "tags": ["string"],
  "text": "string",        // includes {{variables}}
  "variables": ["string"]
}
```

### Usage Counter

```json
{
  "id": "same-id",
  "usageCount": 0
}
```

## 4. API Endpoints

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | /prompts            | List all prompts        |
| POST   | /prompts            | Create prompt           |
| PUT    | /prompts/\:id       | Update prompt           |
| DELETE | /prompts/\:id       | Delete prompt           |
| POST   | /prompts/\:id/usage | Increment usage counter |

## 5. Frontend Components

* **Sidebar**: Category & Tag filters (OR mode)
* **Top Bar**: Search (ctrl+F) and Sort ★ (v2)
* **Prompt List**: Each item with Copy, Edit, Delete, Star (v2)
* **Add Prompt Form**: At top, fields for category, tags, text, variables

## 6. Data Flow

1. Page load → GET /prompts → render list
2. Copy click → POST /prompts/\:id/usage + clipboard copy
3. Add/Edit/Delete → respective API call → update in-memory state

## 7. Tech Stack

* Frontend: Vanilla JS (ES6+), Fetch API, Flexbox/Grid CSS
* Backend: Serverless Node.js functions
* Storage: JSON in S3 or Firebase RTDB
* Hosting: GitHub Pages + serverless provider

## 8. Deployment

* **CI/CD**: GitHub Actions deploy frontend to Pages; backend via serverless deploy hooks
* **Versioning**: JSON schema updates via PRs; manual initial updates

## 9. Performance & Reliability

* Asset caching, minification
* API targets <200ms response
* Expected uptime \~99.9%

## 10. Extensibility

* v2: In-app search, starring & sorting, role-specific sets, analytics dashboard, collaboration

*End of Document.*
