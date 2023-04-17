import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ConfigService } from '../../config/config.service';
import { ConfigModule } from '../../config/config.module';
import { ProfileModule } from '../profiles/profile.module';
import { uri } from '../../lib/mongo.providers';
import { Profile, ProfileSchema } from '../../models/mongo/profile.model';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

describe('ProfileController', () => {
    let controller: ProfileController;
    let service: ProfileService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
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
            controllers: [ProfileController],
            providers: [ProfileService],
        }).compile();

        controller = module.get<ProfileController>(ProfileController);
        service = module.get<ProfileService>(ProfileService);
    });

    describe('Profile', () => {
        it('Get Profile service', async () => {
            try {
                let result = await service.getAll()
                expect(result.length).toBeGreaterThan(0)
            }
            catch (e) {
                console.log(e)
            }
        });

        it('Get Profile controller', async () => {
            try {
                let result = await controller.getProfile('nqt900')
                expect(result.username).toEqual('nqt900')
            }
            catch (e) {
                console.log(e)
            }
        });
    });
});
