import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { TodoReadModel } from '../domain/TodoReadModel';

type GetAllTodoResponse = Either<TodoReadModel[], never>;

export class GetAllTodoUseCase implements Application.IUseCase<void, Promise<GetAllTodoResponse>> {
  private todoRepo: Application.Repo.ICRUDReadPort<TodoReadModel>;

  constructor(todoRepo: Application.Repo.ICRUDReadPort<TodoReadModel>) {
    this.todoRepo = todoRepo;
  }

  async execute(): Promise<GetAllTodoResponse> {
    const todos = await this.todoRepo.getAll();

    return ok(todos);
  }
}
