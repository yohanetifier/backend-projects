import { Test } from '@nestjs/testing';
import { UserService } from './application/user.service';
import { AuthController } from '../auth/auth.controller';
import { GetUserDTO } from './dto/get-user.dto';
import { User } from './domain/user.entity';
import { PrismaUserRepository } from './infrastructure/prisma.user.repository';
import { PrismaService } from 'src/prisma.service';

jest.mock('../../../src/prisma.service.ts');

describe('AppController', () => {
  let userService: UserService;
  let authController: AuthController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        PrismaService,
        // {
        //   provide: 'PrismaUserRepository',
        //   useClass: PrismaUserRepository,
        // },
      ],
      controllers: [AuthController],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
    authController = moduleRef.get<AuthController>(AuthController);
    authController = moduleRef.get<AuthController>(AuthController);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('getUsers', () => {
    it('should return an array of  user', async () => {
      const userData: GetUserDTO = { email: 'test@test.fr', password: 'test' };
      const result: User = {
        id: 63636,
        email: userData.email,
        password: userData.password,
        name: 'test',
      };
      jest.spyOn(userService, 'getUser').mockImplementation(async () => result);

      expect(await authController.signIn(result)).toBe(result);
    });
  });
});
