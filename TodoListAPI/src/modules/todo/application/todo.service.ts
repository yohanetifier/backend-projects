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
  updateTodo(userId: Todo['userId'], id: Todo['id'], todo: UpdateTodoDTO) {
    return this.prismaTodoRepository.updateTodo(userId, id, todo);
  }
  deleteTodo(userId: Todo['userId'], id: Todo['id']) {
    return this.prismaTodoRepository.deleteTodo(userId, id);
  }
  getTodo(userId: Todo['userId'], page: number, limit: number) {
    return this.prismaTodoRepository.getTodo(userId, page, limit);
  }
}
