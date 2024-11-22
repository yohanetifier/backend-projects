import { Todo } from '../domain/todo.entity';

export type CreateTodoDTO = Omit<Todo, 'id'>;
