import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@clerk/clerk-react";
import { useChatStore } from "../store/useChatStore";



type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    if (!user) return;

    const newSocket = io("http://localhost:5001", {
      query: {
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => setIsConnected(true));
    newSocket.on("disconnect", () => setIsConnected(false));

    newSocket.on("online-users", (userList: string[]) => {
      setOnlineUsers(userList);
    });

    newSocket.on("receive-message", (data) => {
      console.log("Message received:", data);

      const message = {
        _id: data._id || Date.now().toString(),
        senderId: data.senderId,
        receiverId: user.id,
        message: data.message,
        image: data.image || null,
        createdAt: data.createdAt || new Date().toISOString(),
      };

      addMessage(message);
    });

    return () => {
      newSocket.off("connect");
      newSocket.off("disconnect");
      newSocket.off("online-users");
      newSocket.off("receive-message");
      newSocket.disconnect();
    };
  }, [user, addMessage]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
