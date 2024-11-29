import { Request, Response } from 'express';
import { login } from '../services/authService';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};