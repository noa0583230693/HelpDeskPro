# 🎫 Helpdesk System - Ticket Management System

A professional system for managing support requests and technical support, built with **React**, **TypeScript**, **Material-UI** and **Node.js**.

---

## 📋 Project Overview

A complete Helpdesk system that enables managing customer support requests, assigning tasks to agents, and tracking the status and priority of each request. The system includes a modern and intuitive user interface with role-based user management.

### ✨ Key Features

- **Ticket Management (Tickets)**: Create, edit, delete and view tickets
- **Comments System**: Add comments to tickets with author information
- **User Management**: Three roles - customer, agent, admin
- **Authentication & Authorization**: JWT system with role-based access control
- **Status & Priority Management**: Dynamic definition of statuses and priorities
- **Modern User Interface**: Material-UI with responsive design
- **Advanced Error Handling**: Toast notification system and user-friendly error messages
- **Error Boundary**: React error catching at application level

---

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/          # React Components
│   ├── Auth/           # Login & Registration
│   ├── Dashboard/      # Main Control Panel
│   ├── TicketDetail/   # Ticket Details
│   ├── NewTicket/      # Create New Ticket
│   ├── Comments/       # Comments System
│   ├── Users/          # User Management
│   ├── priorities/     # Priority Management
│   ├── status/         # Status Management
│   ├── layout/         # Layout Components
│   └── ErrorBoundary/  # Error Handling
├── context/            # React Context (Auth, Notifications)
├── services/           # API Calls
├── styles/             # Style Files
├── utils/              # Utility Functions
└── interface/          # TypeScript Interfaces

Api/helpdesk-api/       # Node.js Backend
├── src/
│   ├── controllers/    # HTTP Handlers
│   ├── services/       # Business Logic
│   ├── repositories/   # Data Access Layer
│   ├── models/         # TypeScript Models
│   ├── routes/         # API Routes
│   ├── middleware/     # Auth & Validation
│   └── db/            # SQLite Database
```

---

## 🚀 Installation & Running

### Prerequisites
- Node.js v16+ 
- npm or yarn

### Installing Frontend

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build project for production
npm run build

# Run ESLint
npm run lint
```

The server will start on **http://localhost:5173**

### Installing Backend

```bash
cd Api/helpdesk-api

# Install dependencies
npm install

# Build project
npm run build

# Run server
npm run dev
```

The server will start on **http://localhost:4000**

---

## 🔐 Authentication & Authorization

### User Roles

| Role | Permissions |
|-------|---------|
| **Customer** | Create tickets, add comments to own tickets |
| **Agent** | View and assign tickets, manage comments |
| **Admin** | Full access, manage users, statuses and priorities |

### Default Users

| Email | Password | Role |
|--------|-------|-------|
| admin@example.com | password | admin |
| agent@example.com | password | agent |
| customer@example.com | password | customer |

---

## 📚 Technologies

### Frontend
- **React 19.2** - UI Library
- **TypeScript** - Type Safety
- **Material-UI (MUI) 7.3** - UI Components
- **React Router 7.11** - Routing
- **React Hook Form 7.68** - Form Management
- **Axios 1.13** - HTTP Client
- **Vite 7.2** - Build Tool
- **ESLint** - Code Quality

### Backend
- **Node.js + Express** - REST API Server
- **TypeScript** - Type Safety
- **SQLite3** - Database
- **JWT** - Authentication
- **Swagger UI** - API Documentation

---

## 🎨 Error Handling System

The system includes an advanced error handling system:

### Features
- ✅ Styled Toast Messages (Success, Error, Warning, Info)
- ✅ Error Boundary for catching React errors
- ✅ User-friendly error messages
- ✅ Unified handling for all error types (400, 401, 403, 404, 500)
- ✅ Detailed logs for developers

### Usage

```typescript
import { useNotification } from './context/NotificationContext';
import { getUserFriendlyErrorMessage } from './utils/errorHandler';

const { showSuccess, showError } = useNotification();

try {
  await serviceCreateTicket(token, data);
  showSuccess('Ticket created successfully!');
} catch (error) {
  showError(getUserFriendlyErrorMessage(error));
}
```

For more details see: [ERROR_HANDLING_GUIDE.md](./ERROR_HANDLING_GUIDE.md)

---

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new customer
- `POST /auth/login` - Login (returns JWT token)
- `GET /auth/me` - Current user details

### Tickets
- `GET /tickets` - List of tickets
- `POST /tickets` - Create new ticket
- `GET /tickets/:id` - Ticket details
- `PATCH /tickets/:id` - Update ticket
- `DELETE /tickets/:id` - Delete ticket

### Comments
- `POST /tickets/:ticketId/comments` - Add comment
- `GET /tickets/:ticketId/comments` - List comments

### Users (Admin only)
- `GET /users` - List of users
- `POST /users` - Create user
- `GET /users/:id` - User details

### Statuses & Priorities (Admin only)
- `GET /statuses`, `POST /statuses`
- `GET /priorities`, `POST /priorities`

Full documentation: **http://localhost:4000/docs** (Swagger UI)

---

## 🗄️ Database

### Main Tables

**users** - Users
- id, name, email, password, role, is_active, created_at

**tickets** - Support Requests
- id, subject, description, status_id, priority_id, created_by, assigned_to, created_at, updated_at

**comments** - Comments
- id, ticket_id, author_id, content, created_at

**statuses** - Statuses
- id, name

**priorities** - Priorities
- id, name

The database is automatically created at `Api/helpdesk-api/data/app.db`

---

## 🧪 Testing

### Postman Collection
1. Import `Api/helpdesk-api/helpdesk.postman_collection.json`
2. Set variables: baseHost, basePort, token
3. Run tests: Health Check → Register → Login → Create Ticket

### Swagger UI
Go to **http://localhost:4000/docs** for interactive documentation

---

## 📝 Configuration Files

- `vite.config.ts` - Vite Settings
- `tsconfig.json` - TypeScript Settings
- `eslint.config.js` - ESLint Rules
- `package.json` - Dependencies & Scripts

---

## 🎓 Learning & Development

The project demonstrates:
- ✅ Modular Architecture (Frontend + Backend)
- ✅ Advanced TypeScript with full type safety
- ✅ React Hooks (useState, useEffect, useContext, Custom Hooks)
- ✅ Context API for global state management
- ✅ Protected Routes and Access Control
- ✅ Form Validation with React Hook Form
- ✅ REST API with Express
- ✅ JWT Authentication
- ✅ Database Design (SQLite)
- ✅ Professional Error Handling

---

## ⚠️ Important Notes

1. **Passwords**: The system uses simple passwords for learning. Use bcrypt in production!
2. **JWT Secret**: Change the secret in production via environment variable
3. **CORS**: Add CORS settings if frontend and backend are on different servers

---

## 📄 License

Educational Project - No specific license

---

**Good luck! 🚀**
