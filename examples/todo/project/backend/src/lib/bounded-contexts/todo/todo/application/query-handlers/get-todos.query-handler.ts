import { Application, Either, fail, ok } from '@bitloops/bl-boilerplate-core';
import { Traceable } from '@bitloops/bl-boilerplate-infra-telemetry';
import { TodoReadModel } from '../../domain/todo.read-model';
import { GetTodosQuery } from '../../queries/get-todos.query';
import { Inject } from '@nestjs/common';
import { TodoReadRepoPortToken } from '../../constants';
import { TodoReadRepoPort } from '../../ports/todo-read.repo-port';
export type GetTodosQueryHandlerResponse = Either<
  TodoReadModel[],
  Application.Repo.Errors.Unexpected
>;
export class GetTodosQueryHandler
  implements Application.IQueryHandler<GetTodosQuery, TodoReadModel[]>
{
  constructor(
    @Inject(TodoReadRepoPortToken)
    private readonly todoRepo: TodoReadRepoPort
  ) {}
  get query() {
    return GetTodosQuery;
  }
  get boundedContext(): string {
    return 'todo';
  }
  @Traceable({
    operation: 'GetTodosQueryHandler',
    metrics: {
      name: 'GetTodosQueryHandler',
      category: 'queryHandler',
    },
  })
  async execute(query: GetTodosQuery): Promise<GetTodosQueryHandlerResponse> {
    const todos = await this.todoRepo.getAll();
    if (todos.isFail()) {
      return fail(todos.value);
    }
    if (!todos.value) {
      return ok([]);
    }
    return ok(todos.value);
  }
}
