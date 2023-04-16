import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { appConfig, redocOptions } from './config/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { RedocModule } from '@juicyllama/nestjs-redoc';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.use(helmet());

  const document = SwaggerModule.createDocument(app, appConfig);
  SwaggerModule.setup('docs', app, document);
  await RedocModule.setup('redoc', app, document, redocOptions);
  await app.listen(config.appPort);
}

bootstrap();
