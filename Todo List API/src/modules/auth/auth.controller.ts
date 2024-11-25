import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Request,
  Res,
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
import { convertStringToNumber } from '../utils/convertStringToNumber';
import { Response } from 'express';

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
  updateTodo(@Param('id') id: string, @Body() todo: UpdateTodoDTO) {
    const convertIdToNumber = convertStringToNumber(id);
    return this.authService.updateTodo(convertIdToNumber, todo);
  }

  @HttpCode(204)
  @Delete('todos/:id')
  @UseGuards(AuthGuard)
  async deleteTodo(
    @Param('id') id: string,
    @Request() req,
    @Res() res: Response,
  ) {
    const { sub } = req.user;
    const convertIdToNumber = convertStringToNumber(id);
    const isDeleted = await this.authService.deleteTodo(sub, convertIdToNumber);
    if (isDeleted) {
      return res.status(HttpStatus.NO_CONTENT).send();
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Todo not found' });
    }
  }
}
