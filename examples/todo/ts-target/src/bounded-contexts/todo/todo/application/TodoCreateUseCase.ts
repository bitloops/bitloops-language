import { Application, Either, fail, ok } from '@bitloops/bl-boilerplate-core';

import { TodoCreateRequestDTO } from '../dtos/TodoCreateRequestDTO';
import { Todo } from '../domain/Todo';
import { TitleVO } from '../domain/Title';
import { DomainErrors } from '../domain/DomainErrors';
import { TodoId } from '../domain/TodoId';

type TodoCreateResponse = Either<void, DomainErrors.TitleOutOfBoundsError>;

export class TodoCreateUseCase
  implements Application.IUseCase<TodoCreateRequestDTO, Promise<TodoCreateResponse>>
{
  private todoRepo: Application.Repo.ICRUDWritePort<Todo, TodoId>;

  constructor(todoRepo: Application.Repo.ICRUDWritePort<Todo, TodoId>) {
    this.todoRepo = todoRepo;
  }

  async execute(request: TodoCreateRequestDTO): Promise<TodoCreateResponse> {
    const titleVO = TitleVO.create({ title: request.title });
    if (titleVO.isFail()) {
      return fail(titleVO.value);
    }
    const todo = Todo.create({ title: titleVO.value, completed: false });
    if (todo.isFail()) {
      return fail(todo.value);
    }

    await this.todoRepo.save(todo.value);
    return ok();
  }
}
