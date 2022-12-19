import { RESTControllerNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { GraphQLControllerBuilderDirector } from '../../builders/controllers/graphqlDirector.js';

type TestCase = {
  description: string;
  controller: RESTControllerNode;
  output: string;
};

export const VALID_GRAPHQL_CONTROLLER_TEST_CASES: TestCase[] = [
  {
    description: 'GraphQL controller with switch statement',
    controller: new GraphQLControllerBuilderDirector().buildControllerWithSwitchStatement(
      'HelloWorldController',
      'HelloWorldRequestDTO',
      'HelloWorldResponseDTO',
    ),
    output: `import { GraphQL } from '@bitloops/bl-boilerplate-infra-graphql';
  import { HelloWorldRequestDTO } from '../dtos/HelloWorldRequestDTO';
  import { HelloWorldResponseDTO } from '../dtos/HelloWorldResponseDTO';
  import { HelloWorldUseCase } from '../application/HelloWorldUseCase';
  import { DomainErrors } from '../domain/errors/index';
  export class HelloWorldController extends GraphQL.BaseController<
  GraphQL.TRequest<HelloWorldRequestDTO>,
  HelloWorldResponseDTO
> {
  private useCase: HelloWorldUseCase;
  constructor(useCase: HelloWorldUseCase) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(request: any): Promise<any> {
    const dto = request.args;
    const result = await this.useCase.execute(dto);
    if (result.value.isFail()) {
      switch (result.value.constructor) {
        case DomainErrors.InvalidNameError: {
          return this.clientError(result.value.message);
        }
        default: {
          return this.error(result.value.message);
        }
      }
    } else {
      return this.ok(result.value);
    }
  }
}
`,
  },
];
