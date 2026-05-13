import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { validateAccess, verifyAccessToken } from '../services/authService';

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new AppError('Token não fornecido', 401);
    }

    const decoded = verifyAccessToken(token);

    const hasAccess = await validateAccess(decoded.id, token);

    if (!hasAccess) {
        throw new AppError('Token inválido ou expirado', 401);
    }

    req.body.userId = decoded.id;

    next();
};