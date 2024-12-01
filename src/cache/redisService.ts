import { redisClient } from './redisClient';

export class RedisService {
    async set(key: string, value: any, ttl?: number): Promise<void> {
        const serializedValue = JSON.stringify(value);
        if (ttl) {
            await redisClient.setex(key, ttl, serializedValue);
        } else {
            await redisClient.set(key, serializedValue);
        }
    }

    async get<T>(key: string): Promise<T | null> {
        const value = await redisClient.get(key);
        return value ? JSON.parse(value) : null;
    }

    async delete(key: string): Promise<void> {
        await redisClient.del(key);
    }
}

export const redisService = new RedisService();