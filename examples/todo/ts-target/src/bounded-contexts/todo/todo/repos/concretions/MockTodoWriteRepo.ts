import { Application, Domain } from '@bitloops/bl-boilerplate-core';
import { TitleVO } from '../../domain/TitleVO';
import { TodoEntity } from '../../domain/TodoEntity';

export class MockTodoWriteRepo
  implements Application.Repo.ICRUDWritePort<TodoEntity, Domain.UUIDv4>
{
  async getById(todoId: Domain.UUIDv4): Promise<TodoEntity> {
    return TodoEntity.create({
      title: TitleVO.create({ title: 'mockTitle' }).value as TitleVO,
      completed: false,
    }).value;
  }

  async delete(todoId: Domain.UUIDv4): Promise<void> {
    console.log('Deleting todo', todoId);
  }

  async save(todo: TodoEntity): Promise<void> {
    console.log('Saving todo', todo);
  }

  async update(todo: TodoEntity): Promise<void> {
    console.log('Updating todo', todo);
  }
}
