import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useUser } from "@clerk/clerk-react";
import { useSocket } from "../hooks/useSocket";
import { Volume2 } from "lucide-react";
import { speakText } from "../lib/elevenlabs";

function Chat() {
  const { messages, getMessages, isMessagesLoading, selectedUser, addMessage } = useChatStore();
  const { user } = useUser();
  const { socket } = useSocket();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  interface IncomingMessage {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    image?: string;
    createdAt: string;
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (incoming: IncomingMessage) => {
      console.log("📨 Received message:", incoming);

      if (
        selectedUser &&
        (incoming.senderId === selectedUser._id || incoming.senderId === user?.id)
      ) {
        addMessage({
          _id: `${Date.now()}-${Math.random()}`,
          senderId: incoming.senderId,
          text: incoming.text,
          image: incoming.image || undefined,
          createdAt: new Date().toISOString(),
          receiverId: selectedUser._id,
        });

        
      }
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, selectedUser, addMessage, user?.id]);

  function formatMessageTime(createdAt: string): React.ReactNode {
    const date = new Date(createdAt);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
  const message = msg as IncomingMessage;
  const isSender = message.senderId === user?.id;

  const hasText = !!message.text;
  const hasImage = !!message.image;

  return (
    <div
      key={message._id}
      className={`chat ${isSender ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border">
          <img
            src={
              isSender
                ? user?.imageUrl || "/avatar.png"
                : selectedUser?.profilePic || "/avatar.png"
            }
            alt="profile"
          />
        </div>
      </div>
      <div className="chat-header mb-1">
        <time className="text-xs opacity-50 ml-1">
          {formatMessageTime(message.createdAt)}
        </time>
      </div>

      <div
        className={`flex items-center gap-2 ${
          isSender ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Speaker icon only if text exists */}
        {hasText && (
          <button
            onClick={() => speakText(message.text)}
            className="text-zinc-400 hover:text-primary transition"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        )}

        <div className="chat-bubble flex flex-col">
          {hasImage && (
            <img
              src={message.image}
              alt="Attachment"
              className="sm:max-w-[200px] rounded-md mb-2"
            />
          )}
          {hasText && <p>{message.text}</p>}
        </div>
      </div>
    </div>
  );
})}


        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}

export default Chat;
