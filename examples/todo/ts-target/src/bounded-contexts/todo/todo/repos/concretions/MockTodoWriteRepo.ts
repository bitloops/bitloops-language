import { Application } from '@bitloops/bl-boilerplate-core';
import { TitleVO } from '../../domain/Title';
import { Todo } from '../../domain/Todo';
import { TodoId } from '../../domain/TodoId';

export class MockTodoWriteRepo implements Application.Repo.ICRUDWritePort<Todo, TodoId> {
  async getById(todoId: TodoId): Promise<Todo> {
    return Todo.create({
      title: TitleVO.create({ title: 'mockTitle' }).value as TitleVO,
      completed: false,
    }).value;
  }

  async delete(todoId: TodoId): Promise<void> {
    console.log('Deleting todo', todoId);
  }

  async save(todo: Todo): Promise<void> {
    console.log('Saving todo', todo);
  }

  async update(todo: Todo): Promise<void> {
    console.log('Updating todo', todo);
  }
}
