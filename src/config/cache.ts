import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: string;
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      family: 4, // 4 (IPv4) or 6 (IPv6)
      password: process.env.REDIS_PASS || undefined,
      db: 0,
    },
  },
} as ICacheConfig;
