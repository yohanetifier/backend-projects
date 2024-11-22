import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { TodoService } from './application/todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';

@Controller()
export class TodoController {
  constructor(private readonly postService: TodoService) {}
  // @Post()
  // createTodo(@Req() req, @Body() todo: CreateTodoDTO, @Headers() header: any) {
  //   const { sub } = req.user;
  //   return this.postService.createTodo(sub, todo);
  // }
}
