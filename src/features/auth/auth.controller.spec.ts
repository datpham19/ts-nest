import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

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
