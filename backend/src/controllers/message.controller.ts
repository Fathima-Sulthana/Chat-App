import { Request, Response } from 'express';
import User from "../models/user.model";

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