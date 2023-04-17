import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config/config.service';
import { ConfigModule } from '../../config/config.module';
import { ProfileService } from '../profiles/profile.service';
import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profiles/profile.module';
import { uri } from '../../lib/mongo.providers';
import { Profile, ProfileSchema } from '../../models/mongo/profile.model';

import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
describe('AuthController', () => {
  let controller: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule,
        ProfileModule,
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
        MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }])
      ],
      controllers: [AuthController],
      providers: [AuthService,JwtService, ConfigService, ProfileService],
    }).compile();
    const configService = module.get<ConfigService>(ConfigService);
    console.log(configService)
    controller = module.get<AuthController>(AuthController);
  });

  it('Register successfully', async() => {
    let result = await controller.register(
      {
        "email": "nqt900@gmail.com",
        "username": "nqt900",
        "name": "thinh",
        "password": "abc@1234"
      }
    )
    expect(result.token).not.toBeNull()
  });
});
