# Hotel Staff Kanban

A lightweight kanban board tailored for hotel teams (maintenance, housekeeping, front-of-house, kitchen, and management). The app runs entirely in the browser: open `index.html` in any modern browser, add tasks, filter by role, and drag cards between stages.

## Features
- 50-person sample roster covering housekeeping, maintenance, security, food & beverage, and managers.
- Four-column kanban workflow (Backlog → In Progress → Review → Done).
- Task creation form with role/assignee selection, priority, and due date.
- Filtering by role and text search across title, description, and assignee.
- Drag-and-drop between columns plus quick move/remove buttons.
- LocalStorage persistence, JSON export, and a reset button to reload sample data.
- SQL schema (`db/schema.sql`) for a relational backend seed and sample JSON (`data/tasks.json`).

## Running locally
1. From this folder run a simple static server, e.g.:
   ```bash
   npx http-server . -p 5173
   ```
2. Open http://localhost:5173 in your browser.

No build step is required. Data is stored locally in the browser and can be exported as JSON for further processing.
