import { create } from "zustand";
import toast from "react-hot-toast";
import { axioInstance } from "../lib/axios";
import { AxiosError } from "axios";
import type { ReactNode } from "react";

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  image?: string;
  createdAt: string;
}

interface User {
  fullName: string;
  _id: string;
  username: string;
  clerkId: string;
  profilePic?: string;
}

interface MessageInput {
  message: string;
  image?: string; 
}


interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  onlineUsers: string[];
  setOnlineUsers: (users: string[]) => void;
  getUsers: () => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: MessageInput) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({

  
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),

  getUsers: async () => {
  set({ isUsersLoading: true });
  try {
    const res = await axioInstance.get("/users");

    type ApiUser = {
      id: string;
      username: string;
      fullName: ReactNode;
      profilePic?: string;
    };

    const formattedUsers = res.data.map((user: ApiUser) => ({
      _id: user.id, // map id to _id to match frontend usage
      username: user.username,
      fullName: user.fullName,
      clerkId: user.id,
      profilePic: user.profilePic,
    }));

    set({ users: formattedUsers });
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } else {
      toast.error("An unexpected error occurred while fetching users.");
    }
  } finally {
    set({ isUsersLoading: false });
  }
},


  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axioInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to fetch messages");
      } else {
        toast.error("An unexpected error occurred while fetching messages.");
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: MessageInput) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected.");
      return;
    }

    try {
      const res = await axioInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to send message");
      } else {
        toast.error("An unexpected error occurred while sending the message.");
      }
    }
  },


  


}));
