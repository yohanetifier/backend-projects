import { Module } from '@nestjs/common';
import { TodoService } from './application/todo.service';
import { TodoController } from './todo.controller';
import { PrismaTodoRepository } from './infrastructure/prisma-todo.repository';
import { PrismaService } from '../../prisma.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
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
