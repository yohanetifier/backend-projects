import { PrismaService } from 'src/prisma.service';
import { TodoRepository } from '../domain/todo.repository';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { User } from 'src/modules/user/domain/user.entity';
import { Injectable } from '@nestjs/common';
import { Todo } from '../domain/todo.entity';
import { UpdateTodoDTO } from '../dto/update-todo';

@Injectable()
export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createTodo(id: User['id'], todo: CreateTodoDTO): Promise<any> {
    if (!todo) {
      throw new Error('Invalid todo');
    }
    const { description, title } = todo;
    const lastTask = await this.prisma.todo.findFirst({
      orderBy: {
        todoId: 'desc',
      },
    });

    let newTodoNumber = lastTask ? lastTask.todoId + 1 : 1;

    const response = await this.prisma.todo.create({
      data: { userId: id, title, description, todoId: newTodoNumber },
    });
    return response;
  }
  async updateTodo(todo: UpdateTodoDTO): Promise<any> {
    const getTodoById = await this.prisma.todo.findUnique({
      where: { id: todo.id },
    });

    if (getTodoById) {
      return this.prisma.todo.update({
        where: { id: todo.id },
        data: { title: todo.title, description: todo.description },
      });
    } else {
      throw new Error('No todo for this id');
    }
  }
}
