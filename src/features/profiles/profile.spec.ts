import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile, ProfileSchema } from '../../models/mongo/profile.model';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

const mongoose = require("mongoose");

(async () => {
    const mongod = new MongoMemoryServer();
    await mongod.start();
    const mongoUri = mongod.getUri();
    
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
})();

// export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) => MongooseModule.forRootAsync({
//   useFactory: async () => {
//     mongod = new MongoMemoryServer();
//     await mongod.start();
//     const mongoUri = await mongod.getUri();
//     return {
//       uri: mongoUri,
//       ...options,
//     }
//   },
// });

// export const closeInMongodConnection = async () => {
//   if (mongod) await mongod.stop();
// }

// jest.mock('./profile.service');

// describe('ProfileController', () => {
//   let controller: ProfileController;
//   let service: ProfileService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         rootMongooseTestModule(),
//         MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
//       ],
//       controllers: [ProfileController],
//       providers: [ProfileService],
//     }).compile();

//     controller = module.get<ProfileController>(ProfileController);
//     service = module.get<ProfileService>(ProfileService);
//     jest.clearAllMocks();
//   });

//   describe('get', () => {
//     describe('when getProfile is called', () => {
//       let profiles: Profile[];
//       beforeEach(async () => {
//         profiles = await controller.getProfiles();
//       });
//       test('should call profileService.getAll', () => {
//         expect(service.getAll).toHaveBeenCalled();
//       });
//     });
//   });
// });
