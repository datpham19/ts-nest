import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from '@juicyllama/nestjs-redoc';
import config from './index';

export const appConfig = new DocumentBuilder()
  .setTitle(config.appName)
  .setDescription('OpenAPI documentation for the Backend API')
  .setVersion('1.0')
  .build();

export const redocOptions: RedocOptions = {
  title: config.appName,
  logo: {
    url: 'https://dagora.xyz/_next/static/images/logoDagora-62839e46eef8dc93f836de12fef57445.png',
    backgroundColor: '#F0F0F0',
  },
  sortPropsAlphabetically: true,
  hideDownloadButton: false,
  hideHostname: false,
};
// Instead of using SwaggerModule.setup() you call this module
