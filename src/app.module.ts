import { UserModule } from './features/user/user.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { DatabaseModule } from './lib/lib.module';

@Module({
  imports: [UserModule, AuthModule, DatabaseModule],
})
export class AppModule {}
