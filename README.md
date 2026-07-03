# Task Management System

A full-stack application for managing tasks with authentication, profile management, and CRUD operations.

---

##  Features
- User registration and login (JWT-based authentication)
- Profile management and password change
- Task creation, update, deletion, and retrieval
- Priority and status tracking
- Centralized error handling and request validation
- Responsive React frontend with Axios integration
- Node.js/Express backend with MongoDB

---

##  Tech Stack
- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Utilities**: dotenv, nodemon
- **Middleware**: Auth, Error handler, Request validator

 
##  Project Structure

```text
Task-Management-System/
├── client/              # React frontend
├── server/              # Node/Express backend
│    ├── config/         # DB & JWT config
│    ├── models/         # User & Task schemas
│    ├── controllers/    # Auth & Task logic
│    ├── routes/         # API routes
│    ├── middleware/     # Auth, error, validation
│    └── utils/          # Logger & response handler
├── README.md
├── package.json         # Root package 
└── .gitignore
---

##  Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/jimmyopotalando/task-management-system.git
cd task-management-system
2. Install dependencies
bash
cd client && npm install
cd ../server && npm install
3. Environment variables
Create a .env file inside server/:

Code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
4. Run development servers

Frontend:
bash
cd client
npm start

Backend:
bash
cd server
npm run dev
