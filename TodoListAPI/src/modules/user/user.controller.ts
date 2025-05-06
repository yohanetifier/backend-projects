import { Controller } from '@nestjs/common';
import { UserService } from './application/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}
}
