# 🤖 AI-Powered Office Supply Chain Management System

> A full-stack Office Supply Management Platform built using a **fully Agentic AI development workflow**.
> Instead of manually coding every feature, specialized AI agents collaborated to design, implement, test, document, and deploy the application.

![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-orange)
![JWT](https://img.shields.io/badge/Auth-JWT-red)

---

# 🚀 What Makes This Project Unique?

This is not just an Office Supply Management System.

This project demonstrates how a **multi-agent AI software engineering team** can collaboratively build a production-ready application.

Instead of relying on a single AI assistant, the system uses specialized agents with clearly defined responsibilities.

Each agent contributes like a real software team member:

* 🧠 Solution Architect
* 👨‍💻 Senior Developer
* 🧪 Unit Test Engineer
* 🔄 E2E Test Engineer
* 📚 Technical Writer
* ⚙️ GitHub Manager
* 🎯 Project Orchestrator

The **Project Orchestrator Agent** coordinates all other agents and combines their outputs into a complete software solution.

---

# 🏢 Application Overview

The Office Supply Management System helps organizations manage office inventory and employee supply requests through a secure role-based platform.

Employees can request supplies while administrators review, approve, reject, and manage inventory.

---

# ✨ Features

## 👨‍💼 Admin Features

* View complete inventory
* Approve employee requests
* Reject requests with reasons
* Track request history
* Monitor stock levels
* Manage inventory records

## 👩‍💻 Employee Features

* Submit supply requests
* Specify quantity and remarks
* View request status
* Track request history
* Monitor approval progress

## 📦 Inventory Features

* Automatic stock deduction
* Inventory synchronization
* Request auditing
* History tracking
* Real-time status updates

---

# 🔐 Authentication & Security

* JWT Authentication
* Role-Based Authorization
* Protected Routes
* Password Hashing (bcryptjs)
* Secure API Access

---

# 🛠️ Tech Stack

| Layer            | Technology      |
| ---------------- | --------------- |
| Frontend         | React 18        |
| Build Tool       | Vite            |
| Routing          | React Router    |
| Backend          | Node.js         |
| Framework        | Express.js      |
| Database         | SQLite (sql.js) |
| Authentication   | JWT + bcryptjs  |
| State Management | Context API     |

---

# 🧠 Agent Architecture

```text
                    ┌──────────────────────┐
                    │ Project Orchestrator │
                    └──────────┬───────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼

┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│ Solution       │   │ Senior         │   │ GitHub         │
│ Architect      │   │ Developer      │   │ Manager        │
└────────────────┘   └────────────────┘   └────────────────┘

         ▼                     ▼                     ▼

┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│ Unit Test      │   │ E2E Test       │   │ Documenter     │
│ Writer         │   │ Writer         │   │ Agent          │
└────────────────┘   └────────────────┘   └────────────────┘
```

---

# 🤖 AI Agents

| Agent                | Responsibility                          |
| -------------------- | --------------------------------------- |
| Project Orchestrator | Coordinates all agents and workflows    |
| Solution Architect   | System design, APIs, database planning  |
| Senior Developer     | Feature implementation and code quality |
| Unit Test Writer     | Unit testing and coverage               |
| E2E Test Writer      | End-to-end flow validation              |
| GitHub Manager       | CI/CD and repository automation         |
| Documenter           | Technical documentation and onboarding  |

---

# 📂 Project Structure

```text
.
├── .github
│   └── agents
│       ├── project-orchestrator.agent.md
│       ├── solution-architect.agent.md
│       ├── senior-developer.agent.md
│       ├── unit-test-writer.agent.md
│       ├── e2e-test-writer.agent.md
│       ├── github-manager.agent.md
│       └── documenter.agent.md
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── AuthContext.jsx
│
├── server
│   ├── routes
│   │   ├── auth.js
│   │   ├── inventory.js
│   │   └── requests.js
│   │
│   ├── database.js
│   ├── middleware.js
│   └── server.js
│
└── README.md
```

---

# 🚀 Quick Start

## Install Dependencies

```bash
cd server && npm install

cd ../client && npm install
```

## Seed Database

```bash
cd server

npm run seed
```

---

# 👤 Demo Accounts

| Username | Password | Role     |
| -------- | -------- | -------- |
| admin    | admin123 | Admin    |
| john     | john123  | Employee |
| jane     | jane123  | Employee |

---

# ▶️ Run Backend

```bash
cd server

npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

# ▶️ Run Frontend

```bash
cd client

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 🔄 Workflow

```text
Employee Login
      │
      ▼
Create Request
      │
      ▼
Pending Review
      │
      ▼
Admin Decision
 ┌───────────────┐
 │ Approve       │
 │ Reject        │
 └───────────────┘
      │
      ▼
Inventory Updated
      │
      ▼
History Recorded
```

---

# 🌐 Deployment

Build and deploy as a single Node service:

```bash
npm install

npm run build

npm start
```

Supports:

* Render
* Railway
* VPS
* Docker
* Azure
* AWS

---

# 🎯 Why This Project Matters

This project showcases:

✅ Full Stack Development

✅ Agentic AI Architecture

✅ Multi-Agent Collaboration

✅ Modern React + Node.js Development

✅ Secure Authentication

✅ Software Engineering Workflows

✅ AI-Assisted Development Lifecycle

---

# 👨‍💻 Author

### Naman Verma

Software Development Engineer

🔗 GitHub: https://github.com/NamanVerma21

---

## ⭐ If you found this project interesting, don't forget to star the repository!

**Built with React, Node.js, and an AI Engineering Team of Specialized Agents.**
