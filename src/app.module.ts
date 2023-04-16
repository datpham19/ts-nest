import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { DatabaseModule } from './lib/lib.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { uri } from './lib/mongo.providers';
import { ProfileModule } from './features/profiles/profile.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          uri: uri,
          user: configService.get('MONGO_USERNAME'),
          pass: configService.get('MONGO_PASSWORD'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as MongooseModuleAsyncOptions),
    }),
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ProfileModule,
    AuthModule,
  ],
})
export class AppModule {}
