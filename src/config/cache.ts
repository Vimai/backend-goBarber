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
      host: '127.0.0.1',
      port: 6379,
      family: 4, // 4 (IPv4) or 6 (IPv6)
      password: undefined,
      db: 0,
    },
  },
} as ICacheConfig;
