import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateTodoDTO } from './create-todo.dto';

export class UpdateTodoDTO {
  title: string;
  description: string;
}
