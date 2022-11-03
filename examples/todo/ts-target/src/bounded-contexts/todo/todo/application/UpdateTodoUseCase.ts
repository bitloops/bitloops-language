import { Application, Domain, Either, fail, ok } from '@bitloops/bl-boilerplate-core';

import { TodoEntity } from '../domain/TodoEntity';
import { ApplicationErrors } from '../application/errors';
import { UpdateTodoRequestDTO } from '../dtos/UpdateTodoRequestDTO';
import { TitleVO } from '../domain/TitleVO';

type UpdateTodoUseCaseResponse = Either<void, ApplicationErrors.ToDoNotFound>;

export class UpdateTodoUseCase
  implements Application.IUseCase<UpdateTodoRequestDTO, Promise<UpdateTodoUseCaseResponse>>
{
  private todoRepo: Application.Repo.ICRUDWritePort<TodoEntity, Domain.UUIDv4>;

  constructor(todoRepo: Application.Repo.ICRUDWritePort<TodoEntity, Domain.UUIDv4>) {
    this.todoRepo = todoRepo;
  }

  async execute(request: UpdateTodoRequestDTO): Promise<UpdateTodoUseCaseResponse> {
    const requestId = new Domain.UUIDv4(request.id);

    const todoFound = await this.todoRepo.getById(requestId);

    if (!todoFound) {
      return fail(new ApplicationErrors.ToDoNotFound(requestId));
    }

    const titleToUpdate = TitleVO.create({ title: request.title });
    if (titleToUpdate.isFail()) {
      return fail(titleToUpdate.value);
    }

    const todoToUpdate = await TodoEntity.create({
      id: requestId,
      title: titleToUpdate.value,
      completed: request.completed,
    });

    if (todoToUpdate.isFail()) {
      return fail(todoToUpdate.value);
    }

    await this.todoRepo.update(todoToUpdate.value);
    return ok();
  }
}
