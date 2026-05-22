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

### Frontend (Vercel)
The `frontend` directory includes a `vercel.json` file. You can deploy it directly to Vercel by importing the repository and setting the root directory to `frontend`. Ensure you configure environment variables for the API URL if needed.

### Backend (Render)
The `backend` directory includes a `render.yaml` blueprint. Connect your repository to Render to automatically deploy the web service. Don't forget to configure the `MONGODB_URI` and `JWT_SECRET` environment variables in the Render dashboard. Note: Because Render uses an ephemeral file system, local image uploads (via multer) will reset upon deployment. For a true production build, migrate file storage to AWS S3 or Cloudinary.
