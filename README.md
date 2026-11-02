# 🚀 TaskForge – MERN Project Management App

TaskForge is a full-stack Project Management Application built using the MERN Stack.  
It allows users to securely register, log in, verify their email, and manage tasks efficiently with a drag-and-drop Kanban board.

---

## 🧠 Tech Stack

**Frontend**
- React 19 (Vite 7) -- frontend library and build tool
- Tailwind CSS -- utility-first styling
- shadcn/ui + Radix UI -- accessible, customizable UI components
- Axios -- API communication
- React Router DOM v7 -- routing
- dnd-kit -- drag and drop for the Kanban board

**Backend**
- Node.js -- server runtime
- Express.js 5 -- web framework
- MongoDB -- database
- Mongoose -- MongoDB ODM
- jsonwebtoken -- JWT authentication
- bcryptjs -- password hashing
- Nodemailer / Resend -- transactional emails (email verification)

---

## ✨ Features

- 🔐 User Authentication (Register & Login)
- 🔑 JWT-based Authorization
- 📧 Email Verification
- 📝 Create Tasks
- 📋 View Task List
- 🧲 Drag & Drop Kanban Board
- 👤 User Profile
- 🛡 Protected Routes
- 📦 RESTful API Architecture
- 🌐 Full Frontend-Backend Integration

---

## 🛣 Progress

- ✅ Project setup
- ✅ MongoDB connection
- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Task CRUD
- ✅ Drag & Drop Board (Kanban)
- ✅ User Profile
- ✅ Email Verification
- ⏳ User Invitation via Email
- ⏳ Team Collaboration
- ⏳ Create Sprint
- ⏳ Report

---

## 📦 Third-Party Libraries

### Frontend

| Library | Purpose |
|---------|---------|
| React / React DOM | UI library |
| Vite | Dev server and build tool |
| Tailwind CSS | Utility-first CSS styling |
| tailwindcss-animate / tw-animate-css | Animation utilities for Tailwind |
| shadcn | Reusable and customizable UI components |
| Radix UI | Accessible UI primitives (dialog, dropdown, select, tabs, tooltip, etc.) |
| class-variance-authority | Component style variants |
| clsx / tailwind-merge | Conditional and conflict-free className handling |
| lucide-react | Icons |
| @dnd-kit/react | Drag and drop for Kanban |
| Axios | HTTP requests between frontend and backend |
| React Router DOM | Client-side routing |
| sonner | Toast notifications |
| vaul | Drawer component |
| Geist / Roboto Condensed (Fontsource) | Typography |

### Backend

| Library | Purpose |
|---------|---------|
| Express | Web framework |
| mongoose | MongoDB object modeling |
| jsonwebtoken | JWT authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variable management |
| cors | Cross-origin resource sharing |
| nodemailer | Sending emails (email verification) |
| resend | Email delivery service API |
| nodemon | Development server auto restart |

---

## 📂 Project Structure

```
TaskForge/
├── backend/     # Express + MongoDB API
└── frontend/    # React (Vite) client
```
