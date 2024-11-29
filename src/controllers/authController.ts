import { Request, Response } from 'express';
import { login } from '../services/authService';
import { User } from '../models/userModel';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error });
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'Usuário já existe' });
            return;
        }

        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
};