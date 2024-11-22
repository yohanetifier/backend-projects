import { Module } from '@nestjs/common';
import { TodoService } from './application/todo.service';
import { TodoController } from './todo.controller';
import { PrismaTodoRepository } from './infrastructure/prisma-todo.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    TodoService,
    PrismaService,
    {
      provide: 'PrismaTodoRepository',
      useClass: PrismaTodoRepository,
    },
  ],
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule {}
