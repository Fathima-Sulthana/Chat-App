import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db";

dotenv.config();

const app= express();
const PORT = process.env.PORT || 5001;

app.use(express.json());



app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
})
