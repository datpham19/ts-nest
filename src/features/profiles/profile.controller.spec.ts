import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile } from '../../models/mongo/profile.model';

jest.mock('./profile.service');

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
    jest.clearAllMocks();
  });

  describe('get', () => {
    describe('when getProfile is called', () => {
      let profiles: Profile[];
      beforeEach(async () => {
        profiles = await controller.getProfiles();
      });
      test('should call profileService.getAll', () => {
        expect(service.getAll).toHaveBeenCalled();
      });
    });
  });
});
