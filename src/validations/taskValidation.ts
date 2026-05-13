import { z } from 'zod';

const objectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Identificador inválido');

export const taskParamsSchema = z.object({
    id: objectIdSchema,
});

export const createTaskSchema = z.object({
    title: z
        .string({ error: 'O título é obrigatório' })
        .trim()
        .min(1, 'O título é obrigatório')
        .max(100, 'O título deve ter no máximo 100 caracteres'),

    description: z
        .string()
        .trim()
        .max(500, 'A descrição deve ter no máximo 500 caracteres')
        .optional(),

    status: z
        .enum(['pending', 'completed'], {
            message: 'O status deve ser pending ou completed',
        })
        .optional(),
});

export const updateTaskSchema = createTaskSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'Informe ao menos um campo para atualizar',
    });