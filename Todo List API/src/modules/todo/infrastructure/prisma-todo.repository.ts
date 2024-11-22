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
    const response = await this.prisma.todo.create({
      data: { userId: id, title, description },
    });
    console.log('response', response);
    return response;
  }
}
