import { Request, Response } from 'express';
import User from "../models/user.model";
import Message from '../models/message.model';
import v2 from "../lib/cloudinary";
const cloudinary = v2;

declare module 'express-serve-static-core' {
    interface Request {
        auth?: {
            userId?: string;
            
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

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.auth?.userId;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in sendMessage controller: ", error);
        res.status(500).json({error: "Internal Server error"});
    }
};