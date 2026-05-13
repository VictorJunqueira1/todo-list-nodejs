import { NextFunction, Request, RequestHandler, Response } from 'express';
import { z, ZodSchema } from 'zod';
import { AppError } from '../errors/AppError';

type ValidationSchemas = {
    body?: ZodSchema;
    params?: ZodSchema;
    query?: ZodSchema;
};

const formatZodErrors = (error: z.ZodError) => {
    return error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
    }));
};

export const validateRequest = (schemas: ValidationSchemas): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (schemas.body) {
            const result = schemas.body.safeParse(req.body);

            if (!result.success) {
                throw new AppError('Dados inválidos', 400, formatZodErrors(result.error));
            }

            req.body = result.data;
        }

        if (schemas.params) {
            const result = schemas.params.safeParse(req.params);

            if (!result.success) {
                throw new AppError('Parâmetros inválidos', 400, formatZodErrors(result.error));
            }

            Object.assign(req.params, result.data);
        }

        if (schemas.query) {
            const result = schemas.query.safeParse(req.query);

            if (!result.success) {
                throw new AppError('Filtros inválidos', 400, formatZodErrors(result.error));
            }

            Object.assign(req.query, result.data);
        }

        next();
    };
};