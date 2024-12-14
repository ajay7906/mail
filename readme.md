# MERN Stack Project Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB installed locally or a MongoDB Atlas account
- Git (optional, for version control)

## Project Structure
```
project-root/
├── frontend/     # Vite + React frontend
└── backend/      # Node.js backend
```

## Frontend Setup (Vite + React)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:3001  # Your backend URL
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Backend Setup (Node.js)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/your_database_name
# Add other environment variables like JWT_SECRET if needed
```

4. Start the server:
```bash
npm start
```

The backend API will be available at `http://localhost:5000`

## Running the Full Stack

1. Open two terminal windows/tabs
2. In the first terminal:
```bash
cd backend
npm start
```
3. In the second terminal:
```bash
cd frontend
npm run dev
```

## Build for Production

### Frontend
```bash
cd frontend
npm run build
```
The built files will be in the `dist` directory.

### Backend
```bash
cd backend
npm run build  # If you have a build script configured
```

## Common Issues and Solutions

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running locally
   - Check if the MongoDB URI is correct
   - Verify network connectivity

2. **CORS Errors**
   - Check if CORS is properly configured in backend
   - Verify the frontend API URL matches the backend URL

3. **Port Already in Use**
   - Change the port in `.env` file
   - Kill the process using the port: `npx kill-port 5000`

## Additional Notes

- Keep all sensitive information in `.env` files
- Don't commit `.env` files to version control
- For production deployment, set appropriate environment variables
- Regularly update dependencies for security patches

## Support and Resources

- Vite Documentation: https://vitejs.dev/
- React Documentation: https://reactjs.org/
- Node.js Documentation: https://nodejs.org/
- MongoDB Documentation: https://docs.mongodb.com/
