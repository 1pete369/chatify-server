import express from "express"
import { Server } from "socket.io"
import http from "http"

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL]
  }
})

const userSocketMap = {}

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId]
}

io.on("connection", (socket) => {
  console.log("A user connected ", socket.id)

  const userId = socket.handshake.query.userId
  if (userId) userSocketMap[userId] = socket.id

  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id)
    if (userId) {
      delete userSocketMap[userId]
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})

export { io, app, server, getReceiverSocketId }
