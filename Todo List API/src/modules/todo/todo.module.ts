import { Module } from '@nestjs/common';
import { TodoService } from './application/todo.service';
import { TodoController } from './todo.controller';
import { PrismaTodoRepository } from './infrastructure/prisma-todo.repository';

@Module({
  providers: [
    TodoService,
    {
      provide: 'PrismaTodoRepository',
      useClass: PrismaTodoRepository,
    },
  ],
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule {}
