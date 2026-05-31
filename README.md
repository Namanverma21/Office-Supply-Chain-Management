# 🚀 Office Supply Management System

A modern full-stack web application that streamlines office inventory management and supply request workflows with secure role-based access control.

---

## 📌 Overview

Managing office supplies manually can be time-consuming and error-prone. This system provides a centralized platform where employees can request office supplies and administrators can manage inventory, approve requests, and track usage efficiently.

---

## ✨ Key Features

### 👨‍💼 Admin Dashboard

* View and manage office inventory
* Approve or reject employee requests
* Track all request activities
* Monitor stock availability
* Add rejection reasons when declining requests

### 👩‍💻 Employee Dashboard

* Submit office supply requests
* Specify item, quantity, and remarks
* Track request status in real-time
* View personal request history

### 🔄 Smart Inventory Management

* Automatic stock deduction on approval
* Request status tracking
* Complete request audit history
* Secure authentication and authorization

---

## 🛠️ Tech Stack

| Layer             | Technology                   |
| ----------------- | ---------------------------- |
| Frontend          | React 18, React Router, Vite |
| Backend           | Node.js, Express.js          |
| Database          | SQLite (sql.js)              |
| Authentication    | JWT, bcryptjs                |
| State Management  | React Context API            |
| API Communication | REST APIs                    |

---

## 📷 Application Workflow

```text
Employee Login
       │
       ▼
Submit Request
       │
       ▼
Admin Reviews Request
   ┌──────────────┐
   │ Approve      │
   │ Reject       │
   └──────────────┘
       │
       ▼
Inventory Updated
       │
       ▼
Request History Recorded
```

---

## 🔐 User Roles

| Role     | Access                                                  |
| -------- | ------------------------------------------------------- |
| Admin    | Inventory Management, Request Approval, Request History |
| Employee | Submit Requests, Track Status, View Personal History    |

---

## 🚀 Quick Start

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd office-supply-management-system
```

### 2️⃣ Install Dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 3️⃣ Seed Database

```bash
cd server
npm run seed
```

### 4️⃣ Start Backend

```bash
npm start
```

Server runs on:

```text
http://localhost:5000
```

### 5️⃣ Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## 🔑 Demo Credentials

| Username | Password | Role     |
| -------- | -------- | -------- |
| admin    | admin123 | Admin    |
| john     | john123  | Employee |
| jane     | jane123  | Employee |

---

## 📂 Project Structure

```text
office-supply-management-system
│
├── server
│   ├── server.js
│   ├── database.js
│   ├── middleware.js
│   ├── seed.js
│   │
│   └── routes
│       ├── auth.js
│       ├── inventory.js
│       └── requests.js
│
├── client
│   └── src
│       ├── App.jsx
│       ├── api.js
│       ├── AuthContext.jsx
│       │
│       ├── components
│       │   └── Navbar.jsx
│       │
│       └── pages
│           ├── Login.jsx
│           ├── AdminDashboard.jsx
│           ├── EmployeeDashboard.jsx
│           ├── Inventory.jsx
│           └── RequestHistory.jsx
│
└── README.md
```

---

## 🌐 Deployment

The application can be deployed as a single Node.js service.

### Build Application

```bash
npm install
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment Support

```env
DB_PATH=/path/to/database.db
JWT_SECRET=your-secret-key
PORT=5000
```

---

## 🎯 Core Business Logic

### Request Approval Flow

1. Employee submits a request.
2. Request remains in **Pending** state.
3. Admin reviews the request.
4. Admin either:

   * Approves request
   * Rejects request with reason
5. Approved requests automatically update inventory.
6. Complete history is stored for auditing.

---

## 🔒 Security Features

* JWT Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Role-Based Authorization
* Secure API Access

---

## 📈 Future Enhancements

* Email Notifications
* Request Analytics Dashboard
* Inventory Forecasting
* Export Reports to Excel/PDF
* Multi-Department Support
* Low Stock Alerts

---

## 👨‍💻 Author

**Naman Verma**

Software Development Engineer | Full Stack Developer

GitHub: https://github.com/NamanVerma21

---

⭐ If you found this project useful, consider giving it a star!
