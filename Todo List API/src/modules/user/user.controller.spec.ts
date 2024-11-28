import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './user.controller';
// import { AppService } from '../../app.service';
import { UserService } from './application/user.service';
import { AuthController } from '../auth/auth.controller';

describe('AppController', () => {
  let userService: UserService;

  beforeEach(async () => {
    let moduleRef = await Test.createTestingModule({
      providers: [UserService],
      controllers: [AuthController],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('getUsers', () => {
    it('should return a user', () => {
      const user = {};
    });
  });
});
