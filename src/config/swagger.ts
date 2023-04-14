import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from '@juicyllama/nestjs-redoc';

export const appConfig = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();

export const redocOptions: RedocOptions = {
  title: 'Hello Nest',
  logo: {
    url: 'https://dagora.xyz/_next/static/images/logoDagora-62839e46eef8dc93f836de12fef57445.png',
    backgroundColor: '#F0F0F0',
    altText: 'PetStore logo',
  },
  sortPropsAlphabetically: true,
  hideDownloadButton: false,
  hideHostname: false,
  auth: {
    enabled: true,
    user: 'admin',
    password: '123',
  },
  tagGroups: [
    {
      name: 'Core resources',
      tags: ['cats'],
    },
  ],
};
// Instead of using SwaggerModule.setup() you call this module
