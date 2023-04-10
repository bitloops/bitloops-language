import { Application, Either, ok } from '@bitloops/bl-boilerplate-core';
import { TodoReadModel } from '../domain/TodoReadModel';
import { TodoReadRepoPort } from '../ports/TodoReadRepoPort';
type GetAllTodosUseCaseResponse = Either<TodoReadModel[], never>;
export class GetAllTodosUseCase
  implements Application.IUseCase<void, Promise<GetAllTodosUseCaseResponse>>
{
  constructor(private todoRepo: TodoReadRepoPort) {}
  async execute(): Promise<GetAllTodosUseCaseResponse> {
    const todos = await this.todoRepo.getAll();
    return ok(todos.value);
  }
}
