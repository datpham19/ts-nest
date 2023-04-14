import { UserModule } from './features/user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { DatabaseModule } from './lib/lib.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class AppModule {}
