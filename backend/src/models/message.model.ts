import { time } from 'console';
import mongoose from 'mongoose';
import { text } from 'stream/consumers';
const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    text: {
        type: String
        
    },

    image: {
        type: String
    },
},
    {
        timestamps: true
    }
    
);

const Message = mongoose.model('Message', messageSchema);
export default Message;