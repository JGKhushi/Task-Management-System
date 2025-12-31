# Task Management System (MERN)

A production-ready task management application featuring a Node.js/Express backend and a React frontend. The application uses JWT for authentication, role-based access control, and MongoDB aggregation for powerful dashboard analytics.

## Features

- **Authentication**: Secure login and registration with JWT.
- **Role-Based Access**: Admins can manage all tasks and view all users; Users manage their own tasks.
- **Task Management**: CRUD operations for tasks with title, description, priority, and due date.
- **Analytics Dashboard**: Visual representation of task distribution (Status, Priority, Creation Trend) using Chart.js.
- **Real-time Filtering**: Filter tasks by status and priority.
- **Responsive Design**: Modern UI built with Tailwind CSS.

## Prerequisites

- Node.js (v16+)
- MongoDB (Local or Atlas)
- npm or yarn

## Installation

### 1. Clone and Backend Setup
    cd backend
    npm install

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory:
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/task-manager
    JWT_SECRET=your_jwt_secret_key
    NODE_ENV=development

### 3. Frontend Setup
    cd ../frontend
    npm install

## Running the Application

### Start Backend
From the `backend` folder:
    npm run dev

### Start Frontend
From the `frontend` folder:
    npm start

The frontend will be available at `http://localhost:3000`.

## API Documentation

### Auth
- `POST /api/auth/register`: Register a user
- `POST /api/auth/login`: Login user
- `GET /api/auth/users`: List users (Admin only)

### Tasks
- `GET /api/tasks`: Get all tasks (filtered by user/admin)
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task
- `DELETE /api/tasks/:id`: Delete a task

### Dashboard
- `GET /api/dashboard/stats`: Get aggregation stats for charts

## Troubleshooting

- **MongoDB Connection**: Ensure your MongoDB service is running or your URI is correct.
- **CORS Issues**: The backend is configured to allow requests from `http://localhost:3000`. If your frontend runs on a different port, update the CORS settings in `server.js`.
- **Chart.js Errors**: Ensure you have a recent version of Chrome or Firefox, as Chart.js uses modern Canvas features.
