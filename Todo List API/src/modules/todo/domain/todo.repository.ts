import { User } from 'src/modules/user/domain/user.entity';
import { CreateTodoDTO } from '../dto/create-todo.dto';

export interface TodoRepository {
  createTodo(id: User['id'], todo: CreateTodoDTO): Promise<any>;
}
