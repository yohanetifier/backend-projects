import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserDTO } from '../user/dto/get-user.dto';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { CreateTodoDTO } from '../todo/dto/todo.dto';

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
  createTodo(@Request() req, @Body() todo: CreateTodoDTO) {
    const { sub } = req.user;
    return this.authService.createTodo(sub, todo);
  }
}
