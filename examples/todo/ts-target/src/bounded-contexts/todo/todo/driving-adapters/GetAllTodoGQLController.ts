import { GraphQL } from '@bitloops/bl-boilerplate-infra-graphql';
import { TodoGetAllUseCase } from '../application/TodoGetAllUseCase';
import { TodoReadModel } from '../domain/TodoReadModel';

type TodoGetAllResponseDTO = {
  todos: TodoReadModel[];
};

export class TodoGetAllGQLController extends GraphQL.BaseController<
  GraphQL.TRequest<void>,
  TodoGetAllResponseDTO
> {
  private useCase: TodoGetAllUseCase;
  constructor(useCase: TodoGetAllUseCase) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(request: GraphQL.TRequest<void>) {
    const result = await this.useCase.execute();
    if (result.isFail()) {
      return this.fail(result.value);
    } else {
      return this.ok({ todos: result.value });
    }
  }
}
