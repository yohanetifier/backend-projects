import { PrismaService } from 'src/prisma.service';
import { TodoRepository } from '../domain/todo.repository';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { User } from 'src/modules/user/domain/user.entity';
import { Injectable } from '@nestjs/common';

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
}
