import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

export const login = async (username: string, password: string): Promise<string> => {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Credenciais inválidas');
    }
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export const register = async (username: string, password: string): Promise<void> => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Usuário já existe');
    }

    const newUser = new User({ username, password });
    await newUser.save();
};