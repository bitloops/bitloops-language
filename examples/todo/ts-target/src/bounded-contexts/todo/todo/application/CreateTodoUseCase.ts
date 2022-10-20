import { Application, Either, fail, ok } from '@bitloops/bl-boilerplate-core';

import { CreateTodoRequestDTO } from '../dtos/CreateTodoRequestDTO';
import { Todo } from '../domain/Todo';
import { TitleVO } from '../domain/Title';
import { DomainErrors } from '../domain/DomainErrors';
import { TodoId } from '../domain/TodoId';

type CreateTodoUseCaseResponse = Either<void, DomainErrors.TitleOutOfBoundsError>;

export class CreateTodoUseCase
  implements Application.IUseCase<CreateTodoRequestDTO, Promise<CreateTodoUseCaseResponse>>
{
  private todoRepo: Application.Repo.ICRUDWritePort<Todo, TodoId>;

  constructor(todoRepo: Application.Repo.ICRUDWritePort<Todo, TodoId>) {
    this.todoRepo = todoRepo;
  }

  async execute(request: CreateTodoRequestDTO): Promise<CreateTodoUseCaseResponse> {
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
