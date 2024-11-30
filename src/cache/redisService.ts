import Redis from 'ioredis';
import dotenv from 'dotenv';
export class RedisService {
    private client: Redis;

    constructor() {
        dotenv.config();

        this.client = new Redis({
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD || undefined,
        });

        this.client.on('connect', () => {
            console.log('Conectado ao Redis!');
        });

        this.client.on('error', (err) => {
            console.error('Erro no Redis:', err);
        });
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        const serializedValue = JSON.stringify(value);
        if (ttl) {
            await this.client.setex(key, ttl, serializedValue);
        } else {
            await this.client.set(key, serializedValue);
        }
    }

    async get<T>(key: string): Promise<T | null> {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }

    async delete(key: string): Promise<void> {
        await this.client.del(key);
    }
}

export const redisService = new RedisService();