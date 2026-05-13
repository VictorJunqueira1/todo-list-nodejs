import mongoose from 'mongoose';
import { env } from '../env';

const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log('MongoDB conectado com sucesso');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;