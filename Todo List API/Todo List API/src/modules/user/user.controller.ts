import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './application/user.service';
import { User } from './domain/user.entity';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  createUser(): any {
    // console.log('user', user);
    return this.userService.createUser();
  }
}
