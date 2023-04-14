import { Module } from '@nestjs/common';
import { mongoProviders } from './mongo.providers';
import { pgProviders } from './pg.providers';

@Module({
  providers: [...mongoProviders, ...pgProviders],
  exports: [...mongoProviders, ...pgProviders],
})
export class DatabaseModule {}
