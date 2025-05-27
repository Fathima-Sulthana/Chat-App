import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react";

function Chat() {

    const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();

    useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);


    if(isMessagesLoading) return <div>Loading...</div>

    
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      
    </div>
  )
}

export default Chat
