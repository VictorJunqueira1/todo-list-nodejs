import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),

    PORT: z.coerce
        .number()
        .default(3000),

    MONGODB_URI: z
        .string()
        .min(1, 'MONGODB_URI é obrigatória'),

    JWT_SECRET: z
        .string()
        .min(32, 'JWT_SECRET deve ter pelo menos 32 caracteres'),

    REDIS_HOST: z
        .string()
        .default('127.0.0.1'),

    REDIS_PORT: z.coerce
        .number()
        .default(6379),

    REDIS_PASSWORD: z
        .string()
        .optional(),

    CORS_ORIGIN: z
        .string()
        .default('*'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error(parsedEnv.error.flatten().fieldErrors);
    throw new Error('Variáveis de ambiente inválidas');
}

if (parsedEnv.data.NODE_ENV === 'production' && parsedEnv.data.CORS_ORIGIN === '*') {
    throw new Error('CORS_ORIGIN não pode ser "*" em produção');
}

export const env = parsedEnv.data;