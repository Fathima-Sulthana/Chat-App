// index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db";
import messageRoutes from "./routes/message.route";
import userRoutes from "./routes/users.route"; 
import { app, server } from "./lib/socket";

dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/message", messageRoutes);
app.use("/api" , userRoutes); // 

server.listen(PORT, async () => {
  console.log("Server is running on port " + PORT);

  try {
    await connectDB();
    console.log("Database connected successfully...");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
  }
});
