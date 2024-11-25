import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUserDTO } from '../user/dto/get-user.dto';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { CreateTodoDTO } from '../todo/dto/create-todo.dto';
import { Todo } from '../todo/domain/todo.entity';
import { UpdateTodoDTO } from '../todo/dto/update-todo-dto';
import { DeleteTodoDTO } from '../todo/dto/delete-todo-dto';

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

  @Put('todos/:id')
  @UseGuards(AuthGuard)
  updateTodo(@Param('id') id: number, @Body() todo: UpdateTodoDTO) {
    const convertIdToNumber = Number(id);
    return this.authService.updateTodo(convertIdToNumber, todo);
  }

  // @Delete('todos')
  // @UseGuards(AuthGuard)
  // deleteTodo(@Body() id: number) {
  //   console.log('id', id);
  // }
}
