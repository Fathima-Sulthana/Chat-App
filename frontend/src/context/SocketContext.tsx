// context/SocketContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@clerk/clerk-react";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[]; // Clerk IDs or user._id
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const newSocket = io("http://localhost:5001", {
      query: {
        userId: user.id, // Clerk user ID
        email: user.primaryEmailAddress?.emailAddress,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => setIsConnected(true));
    newSocket.on("disconnect", () => setIsConnected(false));

    newSocket.on("online-users", (userList: string[]) => {
      setOnlineUsers(userList); // assuming it’s an array of user._id or clerkId
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
