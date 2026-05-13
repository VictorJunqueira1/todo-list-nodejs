import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { redisService } from '../config/cache/redisService';
import { AppError } from '../errors/AppError';
import { env } from '../config/env';

type JwtPayload = {
    id: string;
    iat: number;
    exp: number;
};

export const login = async (username: string, password: string): Promise<string> => {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        throw new AppError('Credenciais inválidas', 400);
    }

    const token = jwt.sign(
        { id: user._id },
        env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    await redisService.set(`auth:${user._id}`, { token }, 3600);

    return token;
};

export const verifyAccessToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    } catch {
        throw new AppError('Token inválido', 401);
    }
};

export const validateAccess = async (userId: string, token: string): Promise<boolean> => {
    const cachedData = await redisService.get<{ token: string }>(`auth:${userId}`);

    return cachedData?.token === token;
};

export const register = async (username: string, password: string): Promise<void> => {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        throw new AppError('Usuário já existe', 400);
    }

    const newUser = new User({ username, password });

    await newUser.save();
};