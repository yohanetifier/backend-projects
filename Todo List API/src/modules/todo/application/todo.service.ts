import { Inject, Injectable } from '@nestjs/common';
import { PrismaTodoRepository } from '../infrastructure/prisma-todo.repository';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { UpdateTodoDTO } from '../dto/update-todo-dto';
import { DeleteTodoDTO } from '../dto/delete-todo-dto';
import { Todo } from '../domain/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('PrismaTodoRepository')
    private readonly prismaTodoRepository: PrismaTodoRepository,
  ) {}
  createTodo(id: number, todo: CreateTodoDTO) {
    return this.prismaTodoRepository.createTodo(id, todo);
  }
  updateTodo(id: number, todo: UpdateTodoDTO) {
    return this.prismaTodoRepository.updateTodo(id, todo);
  }
  deleteTodo(id: Todo['id']) {
    return this.prismaTodoRepository.deleteTodo(id);
  }
}
