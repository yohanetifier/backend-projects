import { Inject, Injectable } from '@nestjs/common';
import { PrismaTodoRepository } from '../infrastructure/prisma-todo.repository';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { UpdateTodoDTO } from '../dto/update-todo';

@Injectable()
export class TodoService {
  constructor(
    @Inject('PrismaTodoRepository')
    private readonly prismaTodoRepository: PrismaTodoRepository,
  ) {}
  createTodo(id: number, todo: CreateTodoDTO) {
    return this.prismaTodoRepository.createTodo(id, todo);
  }
  updateTodo(todo: UpdateTodoDTO) {
    return this.prismaTodoRepository.updateTodo(todo);
  }
}
