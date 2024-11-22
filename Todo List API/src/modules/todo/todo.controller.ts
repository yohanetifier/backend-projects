import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { TodoService } from './application/todo.service';
import { CreateTodoDTO } from './dto/todo.dto';

@Controller()
export class TodoController {
  constructor(private readonly postService: TodoService) {}
  @Post()
  createTodo(@Req() req, @Body() todo: CreateTodoDTO, @Headers() header: any) {
    const { sub } = req.user;
    console.log('header', header.authorization);
    return this.postService.createTodo(sub, todo);
  }
}
