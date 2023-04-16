import { Module } from '@nestjs/common';
import { mongoProviders } from './mongo.providers';
import { pgProviders } from './pg.providers';

@Module({
  providers: [...pgProviders],
  exports: [...pgProviders],
})
export class DatabaseModule {}
