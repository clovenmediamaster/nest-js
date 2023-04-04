import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from '../../login.controller';
import { LoginService } from '../../../modules/login/login.service';
import { LoginResDto } from '../../dto/login.dto';

describe('LoginController', () => {
  let controller: LoginController;
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
  });

  describe('login', () => {
    it('should return a LoginResDto object when given valid credentials', async () => {
      const email = 'example@example.com';
      const password = 'password';
      const expectedResult = new LoginResDto();

      jest
        .spyOn(loginService, 'validateUser')
        .mockResolvedValue(expectedResult);

      const result = await controller.login({ email, password });

      expect(result).toEqual(expectedResult);
    });
  });
});
