import { Module } from '@nestjs/common';
import { TodoService } from './application/todo.service';
import { TodoController } from './todo.controller';
import { PrismaTodoRepository } from './infrastructure/prisma-todo.repository';
import { PrismaService } from '../../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    AuthModule,
  ],
  providers: [TodoService, PrismaService, PrismaTodoRepository],
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule {}
