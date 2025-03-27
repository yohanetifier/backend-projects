import { Todo } from 'src/modules/todo/domain/todo.entity';
import { CreateTodoDTO } from 'src/modules/todo/dto/create-todo.dto';
import { CreateUserDTO } from 'src/modules/user/dto/create-user.dto';
import { GetUserDTO } from 'src/modules/user/dto/get-user.dto';

export interface AuthRepository {
  signIn(credentials: GetUserDTO): Promise<any>;
  signUp(credentials: CreateUserDTO): Promise<any>;
  generateToken(
    id: number,
    name: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  refreshToken(refreshToken: string): Promise<{ accessToken: string }>;
  createTodo(id: number, todo: CreateTodoDTO): Promise<Todo>;
}
