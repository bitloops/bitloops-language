import { GraphQL } from '@bitloops/bl-boilerplate-infra-graphql';
import { GetAllTodoUseCase } from '../../../../../bounded-contexts/todo/todo/application/get-all/GetAllTodoUseCase';
import { TodoReadModel } from '../../../../../bounded-contexts/todo/todo/domain/TodoReadModel';

type TodoGetAllResponseDTO = {
  todos: TodoReadModel[];
};

export class GetAllTodoGQLController extends GraphQL.BaseController<
  GraphQL.TRequest<void>,
  TodoGetAllResponseDTO
> {
  private useCase: GetAllTodoUseCase;
  constructor(useCase: GetAllTodoUseCase) {
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
