import rateLimit from 'express-rate-limit';
import { CorsOptions } from 'cors';
import { env } from './env';

const allowedOrigins = env.CORS_ORIGIN === '*'
    ? '*'
    : env.CORS_ORIGIN.split(',').map((origin) => origin.trim());

export const corsOptions: CorsOptions = {
    origin: allowedOrigins,
};

export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: 'Muitas tentativas de login. Tente novamente em alguns minutos.',
    },
});