import { Application, Domain, Either, fail, ok } from '@bitloops/bl-boilerplate-core';
import { DeleteTodoRequestDTO } from '../dtos/DeleteToDoRequestDTO';
import { TodoEntity } from '../domain/TodoEntity';
import { ApplicationErrors } from './errors';

type DeleteTodoUseCaseResponse = Either<void, ApplicationErrors.ToDoNotFound>;

export class DeleteTodoUseCase
  implements Application.IUseCase<DeleteTodoRequestDTO, Promise<DeleteTodoUseCaseResponse>>
{
  private todoRepo: Application.Repo.ICRUDWritePort<TodoEntity, Domain.UUIDv4>;

  constructor(todoRepo: Application.Repo.ICRUDWritePort<TodoEntity, Domain.UUIDv4>) {
    this.todoRepo = todoRepo;
  }

  async execute(request: DeleteTodoRequestDTO): Promise<DeleteTodoUseCaseResponse> {
    const todoFound = await this.todoRepo.getById(request.id);
    if (!todoFound) {
      return fail(new ApplicationErrors.ToDoNotFound(request.id));
    }
    await this.todoRepo.delete(request.id);
    return ok();
  }
}
