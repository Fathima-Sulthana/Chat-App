import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useUser } from "@clerk/clerk-react";
import { useSocket } from "../hooks/useSocket";


function Chat() {
  const { messages, getMessages, isMessagesLoading, selectedUser, addMessage } = useChatStore();
  const { user } = useUser();
  const { socket } = useSocket();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  // Listen for incoming messages from socket
 
 useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message: { senderId: string; message: string }) => {
  console.log("📨 Received message:", message);

  if (
    selectedUser &&
    (message.senderId === selectedUser._id || message.senderId === user?.id)
  ) {
    addMessage({
      _id: `${Date.now()}-${Math.random()}`,
      senderId: message.senderId,
      message: message.message,
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
  // Format time function (keep your existing)
  function formatMessageTime(createdAt: string): React.ReactNode {
    const date = new Date(createdAt);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Function to send message


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
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === user?.id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === user?.id
                      ? user?.imageUrl || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt="profile"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />
              )}
              {message.message && <p>{message.message}</p>}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Replace MessageInput to accept send function and messageText */}
      <MessageInput/>
    </div>
  );
}

export default Chat;
