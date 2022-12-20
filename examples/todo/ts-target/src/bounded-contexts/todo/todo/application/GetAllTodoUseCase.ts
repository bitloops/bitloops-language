import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { TodoReadModel } from '../domain/TodoReadModel';
import { TodoReadRepoPort } from '../ports/TodoReadRepoPort';

type GetAllTodoResponse = Either<TodoReadModel[], never>;

export class GetAllTodosUseCase implements Application.IUseCase<void, Promise<GetAllTodoResponse>> {
  constructor(private todoRepo: TodoReadRepoPort) {}

  async execute(): Promise<GetAllTodoResponse> {
    const todos = await this.todoRepo.getAll();

    return ok(todos);
  }
}
