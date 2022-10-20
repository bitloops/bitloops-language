import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { TodoReadModel } from '../domain/TodoReadModel';

type TodoGetAllResponse = Either<TodoReadModel[], never>;

export class TodoGetAllUseCase implements Application.IUseCase<void, Promise<TodoGetAllResponse>> {
  private todoRepo: Application.Repo.ICRUDReadPort<TodoReadModel>;

  constructor(todoRepo: Application.Repo.ICRUDReadPort<TodoReadModel>) {
    this.todoRepo = todoRepo;
  }

  async execute(): Promise<TodoGetAllResponse> {
    const todos = await this.todoRepo.getAll();

    return ok(todos);
  }
}
