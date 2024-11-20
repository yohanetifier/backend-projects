import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './application/user.service';
import { GetUserDTO } from './dto/get-user.dto';
import { CreateUserDTo } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  createUser(@Body() user: CreateUserDTo): any {
    return this.userService.createUser(user);
  }
  @Post('login')
  getUser(@Body() user: GetUserDTO) {
    return this.userService.getUser(user);
  }
}
