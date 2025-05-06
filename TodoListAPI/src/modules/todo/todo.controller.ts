import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './application/todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post('create-todos')
  @UseGuards(AuthGuard)
  createTodo(@Req() req, @Body() todo: CreateTodoDTO) {
    const { sub } = req.user;
    return this.todoService.createTodo(sub, todo);
  }
}
