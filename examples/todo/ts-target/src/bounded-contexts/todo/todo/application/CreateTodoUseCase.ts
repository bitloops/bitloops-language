import { Application, Either, fail, ok } from '@bitloops/bl-boilerplate-core';

import { CreateTodoRequestDTO } from '../dtos/CreateTodoRequestDTO';
import { TodoEntity } from '../domain/TodoEntity';
import { TitleVO } from '../domain/TitleVO';
import { DomainErrors } from '../domain/errors';
import { TodoWriteRepoPort } from '../ports/TodoWriteRepoPort.js';

type CreateTodoUseCaseResponse = Either<void, DomainErrors.TitleOutOfBoundsError>;

export class CreateTodoUseCase
  implements Application.IUseCase<CreateTodoRequestDTO, Promise<CreateTodoUseCaseResponse>>
{
  constructor(private todoRepo: TodoWriteRepoPort) {}

  async execute(request: CreateTodoRequestDTO): Promise<CreateTodoUseCaseResponse> {
    const title = TitleVO.create({ title: request.title });
    if (title.isFail()) {
      return fail(title.value);
    }
    const todo = TodoEntity.create({ title: title.value, completed: false });
    if (todo.isFail()) {
      return fail(todo.value);
    }

    await this.todoRepo.save(todo.value);
    return ok();
  }
}
