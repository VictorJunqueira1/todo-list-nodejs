import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { AppError } from '../errors/AppError';

export const errorHandler: ErrorRequestHandler = (error, req, res, next): void => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message,
        });
        return;
    }

    if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({
            message: 'Dados inválidos',
        });
        return;
    }

    if (error instanceof mongoose.Error.CastError) {
        res.status(400).json({
            message: 'Identificador inválido',
        });
        return;
    }

    console.error(error);

    res.status(500).json({
        message: 'Erro interno do servidor',
    });
};