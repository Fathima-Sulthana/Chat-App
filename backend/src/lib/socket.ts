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
    broadcastOnlineUsers();
  }


    socket.on("send-message", (data) => {
  const { _id, senderId, receiverId, message, image } = data;

  console.log("📥 Received message data:", data);

  if ((!message || message.trim() === "") && !image) return;

  const receiverSocketId = onlineUsers.get(receiverId);
  const newMessage = {
    _id,
    senderId,
    receiverId,
    message,
    image: image || null,
    createdAt: new Date().toISOString(),
  };

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("receive-message", newMessage);
  }
});



  // socket.on("send-message", ({ _id, senderId, receiverId, message, image }) => {
  //   console.log("Received message data:", { _id, senderId, receiverId, message, image });

  //   // Prevent sending empty messages (no text and no image)
  //   if ((!message || message.trim() === "") && !image) {
  //     console.log("Rejected empty message.");
  //     return;
  //   }

  //   const newMessage = {
  //     _id: _id || Date.now().toString(),
  //     senderId,
  //     receiverId,
  //     message: message?.trim(),
  //     image: image || null,
  //     createdAt: new Date().toISOString(),
  //   };

  //   const receiverSocketId = onlineUsers.get(receiverId);

  //   if (receiverSocketId) {
  //     io.to(receiverSocketId).emit("receive-message", newMessage);
  //   }
  // });

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
