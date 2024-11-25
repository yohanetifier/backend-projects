import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateTodoDTO } from './create-todo.dto';

export class UpdateTodoDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  title: string;
  description: string;
}
