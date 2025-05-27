import { Request, Response } from 'express';
import User from "../models/user.model";
import Message from '../models/message.model';

declare module 'express-serve-static-core' {
    interface Request {
        auth?: {
            userId?: string;
            // add other properties if needed
        };
    }
}

export const getUsersForSidebar = async (req: Request, res: Response) => {
    try {
        const loggedInUserId = req.auth?.userId;
        const filteredUsers = await User.find({ clerkId: { $ne: loggedInUserId }}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const  { id: userToChatId } = req.params;
        const myId = req.auth?.userId;
        const messages = await Message.find({
            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller: ", error)
        res.status(500).json({error: "Internal server Error"});
    }
};