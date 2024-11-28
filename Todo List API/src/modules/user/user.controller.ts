import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './application/user.service';
import { GetUserDTO } from './dto/get-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}
}
