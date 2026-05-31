# Office Supply Management System

A full-stack web application for managing office supply requests with role-based access control.

## Tech Stack

- **Frontend:** React 18 + React Router + Vite
- **Backend:** Node.js + Express
- **Database:** SQLite (via sql.js — pure JS, no native deps)
- **Auth:** JWT + bcryptjs

## Features

| Role     | Capabilities                                                        |
| -------- | ------------------------------------------------------------------- |
| Admin    | View inventory, approve/reject requests, view full request history  |
| Employee | Submit supply requests (item, quantity, remarks), track own requests |

- Approved requests automatically deduct from inventory
- Rejected requests can include a reason
- Full request history with status tracking

## Quick Start

### 1. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Seed the database

```bash
cd server && npm run seed
```

This creates demo accounts:

| Username | Password  | Role     |
| -------- | --------- | -------- |
| admin    | admin123  | Admin    |
| john     | john123   | Employee |
| jane     | jane123   | Employee |

### 3. Run the app

**Backend** (port 5000):

```bash
cd server && npm start
```

**Frontend** (port 3000):

```bash
cd client && npm run dev
```

Open http://localhost:3000 in your browser.

## Deployment

This app can now be deployed as a single Node service:

- Express serves the built React app from `client/dist`
- API requests stay on the same origin via `/api`
- Demo users and inventory auto-seed on first start when the database is empty
- The SQLite file path can be moved with the `DB_PATH` environment variable

### Generic deployment flow

From the repository root:

```bash
npm install
npm run build
npm start
```

### Render

This repository includes `render.yaml` for a single web service deployment.

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Persistent disk mount: `/opt/render/project/src/data`
- Database file: `/opt/render/project/src/data/office_supply.db`

After deployment, open the service URL and log in with:

| Username | Password  | Role     |
| -------- | --------- | -------- |
| admin    | admin123  | Admin    |
| john     | john123   | Employee |
| jane     | jane123   | Employee |

## Project Structure

```
server/
  server.js          → Express app entry point
  database.js        → SQLite setup (sql.js)
  middleware.js       → JWT auth & role middleware
  seed.js            → Database seed script
  routes/
    auth.js          → Login endpoint
    inventory.js     → Inventory CRUD (admin)
    requests.js      → Request submit/approve/reject

client/
  src/
    App.jsx          → Router & protected routes
    api.js           → API client
    AuthContext.jsx   → Auth state management
    components/
      Navbar.jsx     → Navigation bar
    pages/
      Login.jsx
      AdminDashboard.jsx
      EmployeeDashboard.jsx
      Inventory.jsx
      RequestHistory.jsx
```

## Agents

| Agent | Trigger Phrases | Responsibilities |
|---|---|---|
| **project-orchestrator** | "help me build a complete feature", "implement a full system for..." | Coordinates all other agents; breaks down complex requests into work streams |
| **solution-architect** | "design the architecture for...", "help me with data modeling" | System design, API contracts, technology decisions, risk assessment |
| **senior-developer** | "implement this feature", "refactor this module" | Production-grade implementation, edge case handling, code quality |
| **unit-test-writer** | "write unit tests for...", "improve test coverage" | Unit test suites, mocking strategy, coverage analysis |
| **e2e-test-writer** | "write e2e tests for...", "validate the full flow" | End-to-end test scenarios, integration testing, test data management |
| **github-manager** | "set up CI/CD for...", "configure GitHub Actions" | Workflow YAML, branch protection, release automation, Dependabot |
| **documenter** | "document this feature", "write the README for..." | API docs, architecture decision records, runbooks, onboarding guides |

## How It Works

1. Describe what you want to build to the **project-orchestrator**
2. It breaks the request into work streams and delegates to the right specialists
3. Each specialist agent completes its focused task
4. The orchestrator assembles and validates all deliverables into a cohesive solution

## Repository Structure

```
.github/
└── agents/
    ├── project-orchestrator.agent.md
    ├── solution-architect.agent.md
    ├── senior-developer.agent.md
    ├── unit-test-writer.agent.md
    ├── e2e-test-writer.agent.md
    ├── github-manager.agent.md
    └── documenter.agent.md
```

## Getting Started

To use the agent system, open this repository in an environment that supports GitHub Copilot agent mode (e.g., VS Code with the GitHub Copilot extension) and invoke any agent using its trigger phrases, or start with the **project-orchestrator** for complex end-to-end tasks.
