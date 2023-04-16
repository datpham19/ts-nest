import { UserModule } from './features/user/user.module';
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
          user: configService.get('mongo.user'),
          pass: configService.get('mongo.password'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as MongooseModuleAsyncOptions),
    }),
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UserModule,
    ProfileModule,
    AuthModule,
  ],
})
export class AppModule {}
