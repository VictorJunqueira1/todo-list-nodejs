import { Response } from 'express';

export const ok = <T>(res: Response, message: string, data?: T): void => {
    res.status(200).json({
        message, ...(data !== undefined && { data }),
    });
};

export const created = <T>(res: Response, message: string, data?: T): void => {
    res.status(201).json({
        message, ...(data !== undefined && { data }),
    });
};

export const badRequest = (res: Response, message: string): void => {
    res.status(400).json({ message });
};

export const unauthorized = (res: Response, message: string): void => {
    res.status(401).json({ message });
};

export const notFound = (res: Response, message: string): void => {
    res.status(404).json({ message });
};

export const internalServerError = (res: Response, message = 'Erro interno do servidor'): void => {
    res.status(500).json({ message });
};

export const sendSuccess = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T
): void => {
    res.status(statusCode).json({
        message, ...(data !== undefined && { data }),
    });
};