import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`Server started on port: ${PORT}`);
  await connectDB();
});
