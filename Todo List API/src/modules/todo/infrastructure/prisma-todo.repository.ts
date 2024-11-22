import { TodoRepository } from '../domain/todo.repository';
import { CreateTodoDTO } from '../dto/todo.dto';
import { TodoService } from '../application/todo.service';
import { User } from 'src/modules/user/domain/user.entity';
import { PrismaService } from '../../../prisma.service';

export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createTodo(id: User['id'], todo: CreateTodoDTO): Promise<any> {
    const { description, title } = todo;
    const response = await this.prisma.todo.create({
      data: { userId: id, title, description },
    });
    return response;
  }
}
