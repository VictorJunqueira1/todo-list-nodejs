import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { redisService } from '../cache/redisService';

export const login = async (username: string, password: string): Promise<string> => {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    await redisService.set(`auth:${user._id}`, { token }, 3600);

    return token;
};

export const validateAccess = async (userId: string, token: string): Promise<boolean> => {
    const cachedData = await redisService.get<{ token: string }>(`auth:${userId}`);

    return cachedData?.token === token;
};

export const register = async (username: string, password: string): Promise<void> => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Usuário já existe');
    }

    const newUser = new User({ username, password });
    await newUser.save();
};