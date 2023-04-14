import { NestFactory } from '@nestjs/core';
import { UserModule } from './features/user/user.module';
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
