import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server } from "./lib/socket.js"

dotenv.config()

app.use(express.json({ limit: "10mb" }))
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res) =>{
  res.send("Hey")
})
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
)
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(process.env.PORT, () => {
  console.log(`Server started in port: ${process.env.PORT}`)
  connectDB()
})
