import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserDTO } from '../user/dto/get-user.dto';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { CreateTodoDTO } from '../todo/dto/create-todo.dto';
import { Todo } from '../todo/domain/todo.entity';
import { UpdateTodoDTO } from '../todo/dto/update-todo';

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

  @Patch('todos')
  @UseGuards(AuthGuard)
  updateTodo(@Body() todo: UpdateTodoDTO) {
    return this.authService.updateTodo(todo);
  }
}
