import { registerAs } from '@nestjs/config';

export default registerAs(
  'cache',
  (): Record<string, any> => ({
    ttl: process.env.CACHE_TTL ?? 300 * 1000, // 5 minutes
    max: process.env.CACHE_MAX ?? 10, // maximum number of items in cache

    redisUrl: process.env.CACHE_REDIS_URL ?? 'redis://localhost:6379',
  })
);
