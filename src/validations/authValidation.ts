import { z } from 'zod';

export const registerUserSchema = z.object({
    username: z
        .string({ error: 'O nome de usuário é obrigatório' })
        .trim()
        .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
        .max(50, 'O nome de usuário deve ter no máximo 50 caracteres'),

    password: z
        .string({ error: 'A senha é obrigatória' })
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .max(100, 'A senha deve ter no máximo 100 caracteres'),
});

export const loginUserSchema = z.object({
    username: z
        .string({ error: 'O nome de usuário é obrigatório' })
        .trim()
        .min(1, 'O nome de usuário é obrigatório'),

    password: z
        .string({ error: 'A senha é obrigatória' })
        .min(1, 'A senha é obrigatória'),
});