import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// In-memory storage for online users
const onlineUsers = new Map<string, string>(); // socket.id -> userId

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  const { userId, email } = socket.handshake.query;

  console.log(`${email} (${userId}) connected.`);
  if (typeof userId === "string") {
    onlineUsers.set(socket.id, userId);
    broadcastOnlineUsers();
  }

  socket.on("disconnect", () => {
    console.log(`${email} (${userId}) disconnected.`);
    onlineUsers.delete(socket.id);
    broadcastOnlineUsers();
  });

  function broadcastOnlineUsers() {
    const uniqueUserIds = Array.from(new Set(onlineUsers.values()));
    io.emit("online-users", uniqueUserIds); // emit to all clients
  }
});

export { io, app, server };
