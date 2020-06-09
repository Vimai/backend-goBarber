import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  save(key: string, value: string): Promise<void> {
    // this.client.set()
  }

  recover(key: string): Promise<string> {}

  invalidade(key: string): Promise<void> {}
}
