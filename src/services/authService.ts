import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

export const login = async (username: string, password: string): Promise<string> => {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Credenciais inválidas');
    }
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};