import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db";
import messageRoutes  from "./routes/message.route";
import { Request, Response } from "express";

dotenv.config();

const app= express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/api/message", messageRoutes);


app.listen(PORT, async () => {
  console.log("Server is running on port " + PORT);

  try {
    await connectDB();
    console.log(" Database connected successfully...");
  } catch (err) {
    console.error(" Failed to connect to the database:", err);
  }
});





