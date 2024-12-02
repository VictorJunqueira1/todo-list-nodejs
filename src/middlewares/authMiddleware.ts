import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { redisService } from '../config/cache/redisService';

interface JwtPayload {
    id: string;
    iat: number;
    exp: number;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        const cachedData = await redisService.get<{ token: string }>(`auth:${decoded.id}`);
        if (!cachedData || cachedData.token !== token) {
            res.status(401).json({ message: 'Token inválido ou expirado' });
            return;
        }

        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token inválido' });
    }
};