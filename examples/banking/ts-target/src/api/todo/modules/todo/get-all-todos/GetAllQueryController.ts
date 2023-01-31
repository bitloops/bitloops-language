import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { Either, Infra } from '@bitloops/bl-boilerplate-core';
import { GetAllTodosQuery } from '../../../../../bounded-contexts/todo/todo/application/get-all/GetAllTodosQuery';
import { TodoReadModel } from '../../../../../bounded-contexts/todo/todo/domain/TodoReadModel';

type GetAllUseCaseResponse = Either<TodoReadModel, void>;

export class GetAllQueryController extends Fastify.BaseController {
  constructor(private queryBus: Infra.QueryBus.IQueryBus) {
    super();
    this.queryBus = queryBus;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const query = new GetAllTodosQuery();
    const result = await this.queryBus.query<GetAllUseCaseResponse>(query);

    this.ok(response, result.value);
  }
}
