import { Request, Response } from "express";

export const signup = (req: Request, res: Response) => {
    const { email, fullName, password } = req.body;
    try {
        
    } catch (error) {
        
    }
}

export const login = (req: Request, res: Response) => {
    res.send("Login Page");
}

export const logout = (req: Request, res: Response) => {
    res.send("Logout Page");
}