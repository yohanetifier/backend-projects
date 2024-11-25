import { User } from 'src/modules/user/domain/user.entity';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { Todo } from './todo.entity';

export interface TodoRepository {
  createTodo(id: User['id'], todo: CreateTodoDTO): Promise<Todo>;
  updateTodo(todo: CreateTodoDTO): Promise<Todo>;
}
