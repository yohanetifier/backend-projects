import { Test } from '@nestjs/testing';
import { UserService } from './application/user.service';
import { AuthController } from '../auth/auth.controller';
import { GetUserDTO } from './dto/get-user.dto';
import { User } from './domain/user.entity';
import { PrismaService } from '../../prisma.service';
import { PrismaUserRepository } from './infrastructure/prisma.user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

describe('AppController', () => {
  let userService: UserService;
  let authController: AuthController;
  // let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [
        UserService,
        PrismaService,
        JwtService,
        {
          provide: 'PrismaUserRepository',
          useClass: PrismaUserRepository,
        },
      ],
      // controllers: [AuthController],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
    // authController = moduleRef.get<AuthController>(AuthController);
    authController = moduleRef.get<AuthController>(AuthController);
    // prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('getUsers', () => {
    it('should return an array of  user', async () => {
      const userData: GetUserDTO = {
        email: 'test@test.fr',
        password: 'Eti&300508',
      };
      const result: User = {
        id: 63636,
        email: userData.email,
        password: userData.password,
        name: 'test',
      };
      jest.spyOn(userService, 'getUser').mockImplementation(async () => result);

      expect(await authController.signIn(result)).toBe({
        accessToken: '',
        refreshToken: '',
      });
    });
  });
});
