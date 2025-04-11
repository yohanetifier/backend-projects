import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './application/todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class TodoController {
  constructor(private readonly postService: TodoService) {}
  // @Post()
  // createTodo(@Req() req, @Body() todo: CreateTodoDTO, @Headers() header: any) {
  //   const { sub } = req.user;
  //   return this.postService.createTodo(sub, todo);
  // }
  @Post('todos')
  @UseGuards(AuthGuard)
  createTodo(@Req() req, @Body() todo: CreateTodoDTO) {
    const { sub } = req.user;
    console.log('todo', todo);
    console.log('sub', sub);
    // return this.authService.createTodo(sub, todo);
  }
}
