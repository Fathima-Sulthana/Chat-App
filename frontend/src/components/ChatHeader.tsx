import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, onlineUsers } = useChatStore();

  if (!selectedUser) return null;

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* Left side: avatar + info */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={String(selectedUser.fullName) || "User"}
                
              />
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName ||selectedUser.username ||"User"}</h3>

            
            <p className="text-sm text-base-content/70">
              {onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right side: close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
