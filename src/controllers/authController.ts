import { Request, Response } from 'express';
import { login, register } from '../services/authService';
import { sendSuccess } from '../utils/apiResponse';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    const token = await login(username, password);

    sendSuccess(res, 200, 'Login realizado com sucesso', { token });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    await register(username, password);

    sendSuccess(res, 201, 'Usuário registrado com sucesso');
};