import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AppService } from './app.service';
import { UserService } from './application/user.service';
import { User } from './domain/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { ValidationPipe } from 'src/pipe/validation.pipe';

@Controller('')
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly userService: UserService) {}

  // @Get('/register')
  // getUser(@Body() user: User): string {
  //   console.log('user', user);
  //   return this.userService.getUser();
  // }
  @Post('/register')
  createUser(@Body(new ValidationPipe()) user: CreateUserDTO) {
    console.log('user', user);
    return this.userService.createUser();
  }
}
