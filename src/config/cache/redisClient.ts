import Redis from 'ioredis';
import { env } from '../env';

export const redisClient = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD || undefined,
});

redisClient.on('connect', () => console.log('Conectado ao Redis!'));
redisClient.on('error', (err) => console.error('Erro no Redis:', err));