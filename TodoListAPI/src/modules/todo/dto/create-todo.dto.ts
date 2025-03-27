import { IsNotEmpty, IsString } from 'class-validator';
import { Todo } from '../domain/todo.entity';

export class CreateTodoDTO implements Omit<Todo, 'id' | 'userId' | 'todoId'> {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
