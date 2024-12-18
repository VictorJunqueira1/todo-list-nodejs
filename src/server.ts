import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/database/connection';

dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch((error) => {
    console.error('Erro ao conectar no banco de dados:', error.message);
});