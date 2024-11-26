import { PrismaService } from 'src/prisma.service';
import { TodoRepository } from '../domain/todo.repository';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { User } from 'src/modules/user/domain/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '../domain/todo.entity';
import { UpdateTodoDTO } from '../dto/update-todo-dto';
import { DeleteTodoDTO } from '../dto/delete-todo-dto';

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
  async updateTodo(
    userId: Todo['userId'],
    id: Todo['id'],
    todo: UpdateTodoDTO,
  ): Promise<any> {
    const getTodoById = await this.prisma.todo.findMany({
      where: { userId, todoId: id },
    });

    if (getTodoById) {
      return this.prisma.todo.update({
        where: { id: getTodoById[0].id },
        data: { title: todo.title, description: todo.description },
      });
    } else {
      throw new NotFoundException('No todo for this id');
    }
  }
  async deleteTodo(userId: Todo['userId'], id: Todo['id']): Promise<any> {
    const getTodoById = await this.prisma.todo.findMany({
      where: { userId, todoId: id },
    });

    if (getTodoById.length) {
      return await this.prisma.todo.delete({
        where: { id: getTodoById[0].id },
      });
    } else {
      return false;
    }
  }

  async getTodoById(id: Todo['id']) {
    const getTodoById = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (getTodoById) {
      return getTodoById;
    } else {
      throw new NotFoundException('No todo found');
    }
  }

  async getTodo(userId: Todo['userId'], page: number, limit: number) {
    const getTodosBy = await this.prisma.todo.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        userId,
      },
    });
    return getTodosBy;
  }
}
