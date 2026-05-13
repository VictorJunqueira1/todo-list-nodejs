import { Request, Response } from 'express';
import { login } from '../services/authService';
import { User } from '../models/userModel';
import { badRequest, created, internalServerError, ok } from '../utils/apiResponse';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const token = await login(username, password);

        ok(res, 'Login realizado com sucesso', { token });
    } catch (error) {
        console.error(error);
        badRequest(res, 'Credenciais inválidas');
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            badRequest(res, 'Usuário já existe');
            return;
        }

        const newUser = new User({ username, password });
        await newUser.save();

        created(res, 'Usuário registrado com sucesso');
    } catch (error) {
        console.error(error);
        internalServerError(res, 'Erro ao registrar usuário');
    }
};