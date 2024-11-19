import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './application/user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ValidationPipe } from 'src/pipe/validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  createUser(@Body(new ValidationPipe()) user: CreateUserDTO) {
    return this.userService.createUser(user);
  }
}
