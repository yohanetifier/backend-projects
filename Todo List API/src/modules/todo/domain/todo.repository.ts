import { User } from 'src/modules/user/domain/user.entity';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { Todo } from './todo.entity';
import { UpdateTodoDTO } from '../dto/update-todo-dto';

export interface TodoRepository {
  createTodo(id: User['id'], todo: CreateTodoDTO): Promise<Todo>;
  updateTodo(
    userId: Todo['userId'],
    id: number,
    todo: UpdateTodoDTO,
  ): Promise<Todo>;
  deleteTodo(userId: Todo['userId'], id: Todo['id']): Promise<boolean>;
  getTodo(userId: Todo['userId'], page: number, limit: number): Promise<Todo[]>;
}
