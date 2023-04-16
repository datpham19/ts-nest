import { Module } from '@nestjs/common';
import { pgProviders } from './pg.providers';
import { redisProviders } from './redis.providers';

@Module({
  providers: [...pgProviders, ...redisProviders],
  exports: [...pgProviders, ...redisProviders],
})
export class DatabaseModule {}
