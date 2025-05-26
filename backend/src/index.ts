import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route";
import { dot } from "node:test/reporters";
import { connectDB } from "./lib/db";

dotenv.config();
const app= express();

const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
})
