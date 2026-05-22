# Smart Medicine Reminder App

A full-stack MERN application for managing medicine reminders, complete with authentication, medicine tracking, scheduling, and a responsive dashboard.

## Features
- **User Authentication**: Register, Login, JWT-based auth with bcrypt password hashing.
- **Dashboard**: Overview of total medicines, upcoming reminders, today's schedule, and adherence charts.
- **Medicine Management**: Add, view, edit, and delete prescriptions. Includes support for medicine images, custom dosages, and multiple timings.
- **Responsive Design**: Modern UI built with React, Tailwind CSS, and Lucide icons.
- **Dark Mode**: Fully supports light and dark themes.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, React Router, Recharts, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer (Local storage for demo purposes)

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```bash
npm run dev # Uses nodemon
# or
node index.js
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## Deployment

### Render

This repository includes a root `render.yaml` blueprint that deploys the backend and serves the built Vite frontend from the same Render web service.

1. Push the repository to GitHub.
2. In Render, create a new Blueprint and select this repository.
3. The Render blueprint includes these environment variables:
```
USE_MEMORY_DB=true
JWT_SECRET=hello
```

Render will run `npm run render-build`, then start the app with `NODE_ENV=production npm start`.

This Render setup uses `mongodb-memory-server`, so you do not need MongoDB installed locally or a MongoDB Atlas connection string.

Note: in-memory data resets whenever the Render service restarts, redeploys, or sleeps and wakes up. Local image uploads through multer can also be lost after deploys or restarts. For persistent production data later, use MongoDB Atlas and object storage such as Cloudinary or S3.
