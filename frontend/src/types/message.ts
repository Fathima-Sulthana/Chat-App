// types/message.ts
export type MessageType = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image?: string | null;
  createdAt: string;
};
