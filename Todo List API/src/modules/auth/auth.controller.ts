import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserDTO } from '../user/dto/get-user.dto';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  signIn(@Body() user: GetUserDTO) {
    return this.authService.signIn(user);
  }
  @Post('register')
  signUp(@Body() user: CreateUserDTO) {
    return this.authService.signUp(user);
  }
  @Post('todos')
  @UseGuards(AuthGuard)
  createTodo() {
    console.log('in create todo');
  }
}
