import { Todo } from '../domain/todo';
import { TodoId } from '../domain/todoId';

export interface ITodoRepo {
  exists(todoId: TodoId): Promise<boolean>;
  getAllTodos(): Promise<Todo[]>;
  getTodoById(todoId: TodoId): Promise<TodoId>;
  delete(todoId: TodoId): Promise<void>;
  save(todo: Todo): Promise<void>;
}
