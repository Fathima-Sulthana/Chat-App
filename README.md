# Real-Time Chat Application

A modern real-time chat application built with React, TypeScript, Node.js, and Socket.IO. Features include real-time messaging, voice playback using ElevenLabs API, and media sharing capabilities with Cloudinary integration.

## Features

- 💬 Real-time messaging
- 🎤 Voice playback
- 🖼️ Media file sharing
- 👤 User authentication
- 🎨 Modern UI with responsive design
- ⚡ Fast performance with Vite
- 🔒 Secure communication

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- Socket.IO Client for real-time communication
- Zustand for state management
- Axios for HTTP requests

### Backend
- Node.js with TypeScript
- Express.js
- Socket.IO for real-time features
- MongoDB for database
- Cloudinary for media storage
- ElevenLabs API integration

## Prerequisites

Before running the application, make sure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fathima-Sulthana/Chat-App
   cd Chat-App
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all dependencies for both frontend and backend using npm workspaces.

3. **Environment Setup**
   
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=syour_clerk_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLIENT_URL=http://localhost:5173
   ```

   Create a `.env` file in the frontend directory:
   ```
    VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
    VITE_ELEVENLABS_VOICE_ID=voice_id_elevenlabs
   ```

## Running the Application

1. **Install dependencies**
   ```bash
   npm install
   ```
   This will install dependencies for both frontend and backend.

2. **Start both Frontend and Backend**
   ```bash
   npm run dev
   ```
   This command will concurrently start:
   - Backend server on port 5001
   - Frontend development server on port 5173

3. Open your browser and navigate to `http://localhost:5173`

## Development

### Backend Structure
- `controllers/` - Request handlers and business logic
- `models/` - Database models and schemas
- `routes/` - API route definitions
- `lib/` - Utility functions and configurations

### Frontend Structure
- `components/` - Reusable React components
- `context/` - React context providers
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and configurations
- `pages/` - Main application pages
- `store/` - State management using Zustand

