import Redis, { Redis as RedisClient } from 'ioredis';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis();
  }

  save(key: string, value: string): Promise<void> {
    // this.client.set()
  }

  recover(key: string): Promise<string> {}

  invalidade(key: string): Promise<void> {}
}
