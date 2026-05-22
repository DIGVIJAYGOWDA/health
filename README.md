# Smart Medicine Reminder

A full-stack MERN medicine reminder app for tracking prescriptions, reminders, and daily medicine schedules. The app includes authentication, a responsive dashboard, medicine image uploads, reminder management, dark mode, and a production build that can be deployed directly to Render.

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Dashboard with medicine and reminder summaries
- Add, view, update, and delete medicines
- Create and manage medicine reminders
- Medicine image uploads with Multer
- Responsive React UI built with Tailwind CSS
- Dark mode support
- Single-service Render deployment

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React

**Backend**
- Node.js
- Express
- Mongoose
- JSON Web Tokens
- bcrypt
- Multer
- mongodb-memory-server

## Project Structure

```text
.
├── backend/          # Express API, models, routes, controllers
├── frontend/         # React + Vite frontend
├── package.json      # Root scripts for Render build/start
└── render.yaml       # Render Blueprint config
```

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

By default, the backend starts an in-memory MongoDB instance if no external `MONGODB_URI` is provided.

Optional backend `.env`:

```env
PORT=5000
JWT_SECRET=hello
USE_MEMORY_DB=true
```

Backend URL:

```text
http://localhost:5000
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

During local development, the frontend sends API requests to:

```text
http://localhost:5000/api
```

## Render Deployment

This project is ready to deploy on Render using the root `render.yaml` Blueprint.

### Steps

1. Push the repository to GitHub.
2. Open Render.
3. Click **New +**.
4. Select **Blueprint**.
5. Choose this GitHub repository.
6. Render will detect `render.yaml`.
7. Click **Apply** or **Deploy Blueprint**.
8. Wait for the deploy to finish.
9. Open the generated Render URL.

The Blueprint uses:

```yaml
buildCommand: npm run render-build
startCommand: NODE_ENV=production npm start
```

The included environment variables are:

```env
USE_MEMORY_DB=true
JWT_SECRET=hello
```

No MongoDB Atlas connection string is required for this deployment.

## Important Data Note

This app is currently configured to use in-memory MongoDB on Render. That makes deployment simple because no MongoDB setup is needed.

However, in-memory data is temporary. Users, medicines, reminders, and uploaded files can be lost when:

- Render restarts the service
- You redeploy the app
- The free Render service sleeps and wakes

For real production use, switch to:

- MongoDB Atlas for persistent database storage
- Cloudinary, S3, or another object storage service for image uploads

## Root Scripts

```bash
npm start
npm run install-backend
npm run install-frontend
npm run build-frontend
npm run render-build
```

`npm run render-build` installs backend dependencies, installs frontend dependencies, and builds the frontend.

## API Routes

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile

GET    /api/medicines
POST   /api/medicines
PUT    /api/medicines/:id
DELETE /api/medicines/:id

GET    /api/reminders
POST   /api/reminders
PUT    /api/reminders/:id
DELETE /api/reminders/:id
```

## License

This project is for learning, demos, and experimentation.
