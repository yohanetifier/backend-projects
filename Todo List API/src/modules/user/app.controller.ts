import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { UserService } from './application/user.service';

@Controller('test')
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): string {
    return this.userService.getUser();
  }
}
