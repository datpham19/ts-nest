import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from '@juicyllama/nestjs-redoc';

import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import config from './index';

export const appConfig = new DocumentBuilder()
  .setTitle(config.appName)
  .setDescription('OpenAPI documentation for the Backend API')
  .setVersion('1.0')
  .addBearerAuth({
    // I was also testing it without prefix 'Bearer ' before the JWT
    description: `[just text field] Please enter token in following format: Bearer <JWT>`,
    name: 'Authorization',
    bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
    scheme: 'Bearer',
    type: 'http', // I`ve attempted type: 'apiKey' too
    in: 'Header',
  })
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

export function ApiHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'onChainSignature',
      description: 'Signature of the wallet address',
      required: true,
    }),
    ApiHeader({
      name: 'onChainAddress',
      description: 'Wallet address',
      required: true,
    }),
  );
}
