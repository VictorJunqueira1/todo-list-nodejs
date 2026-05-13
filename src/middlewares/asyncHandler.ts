import { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncRequestHandler = (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
) => Promise<void>;

export const asyncHandler = (handler: AsyncRequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
};