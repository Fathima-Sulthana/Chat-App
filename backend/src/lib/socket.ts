// socket/server.ts
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const onlineUsers = new Map<string, string>();

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  const email = socket.handshake.query.email as string;

  console.log(`${email || "User"} (${userId}) connected.`);

  if (userId) {
    onlineUsers.set(userId, socket.id);
    socket.join(userId); // ✅ Join the room with userId
    broadcastOnlineUsers();
  }

  socket.on("send-message", (data) => {
  const { _id, senderId, receiverId, text, image } = data;

  console.log("📥 Received message data:", data);

  if ((!text || text.trim() === "") && !image) return;

  const newMessage = {
    _id,
    senderId,
    receiverId,
    text,
    image: image || null,
    createdAt: new Date().toISOString(),
  };

  const receiverSocketId = onlineUsers.get(receiverId);

  // ✅ Only send to receiver, NOT to sender
  if (receiverSocketId && receiverSocketId !== socket.id) {
    io.to(receiverSocketId).emit("receive-message", newMessage);
  }
});


  socket.on("disconnect", () => {
    console.log(`${email || "User"} (${userId}) disconnected.`);

    for (const [id, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(id);
        break;
      }
    }

    broadcastOnlineUsers();
  });

  function broadcastOnlineUsers() {
    io.emit("online-users", Array.from(onlineUsers.keys()));
  }
});

export { io, app, server };
