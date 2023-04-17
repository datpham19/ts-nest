import { Injectable, Logger } from '@nestjs/common';

import * as redis from 'redis';
import config from '../config';

@Injectable()
export class RedisService {
  private client;

  constructor() {
    this.client = redis.createClient({
      socket: {
        host: config.redis.host,
        port: config.redis.port,
      },
    });
    (async () => {
      // Connect to redis server
      await this.client.connect();
    })();
    this.client.on('connect', () => {
      Logger.log('Redis client connected');
    });

    this.client.on('error', (err) => {
      Logger.error(`Error connecting to Redis: ${err}`);
    });
  }

  public async getStorage(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  public async setStorage(key: string, value: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  public async deleteStore(key: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  public async pushToStorage(key: string, value: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.client.rpush(key, value, (err, length) => {
        if (err) {
          reject(err);
        } else {
          resolve(length);
        }
      });
    });
  }

  public async popFromStorage(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.client.lpop(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }
}

export const redisProviders = [
  {
    provide: 'REDIS',
    useFactory: async () => {
      const redisService = new RedisService();
      return redisService;
    },
  },
];
