import { TUseCase } from '../../../../../src/types.js';
import { ParameterListBuilderDirector } from '../parameterListBuilderDirector.js';
import { UseCaseDeclarationBuilder } from './useCaseBuilder.js';
import { ExecuteBuilderDirector } from '../execute/executeDirector.js';

export class UseCaseBuilderDirector {
  private useCaseBuilder: UseCaseDeclarationBuilder;

  constructor() {
    this.useCaseBuilder = new UseCaseDeclarationBuilder();
  }

  buildUseCaseWithoutErrorAndReturnDTO({ identifier }: { identifier: string }): TUseCase {
    const useCase = this.useCaseBuilder
      .withIdentifier(identifier)
      .withParameterList(new ParameterListBuilderDirector().buildParams([]))
      .withExecute(new ExecuteBuilderDirector().buildExecuteWithOneReturnDTO())
      .build();

    return useCase;
  }

  buildUseCaseWithDomainDeclarations({
    identifier,
    executeReturnTypes,
  }: {
    identifier: string;
    executeReturnTypes: { identifierOK: string; identifierError?: string };
  }): TUseCase {
    const useCase = this.useCaseBuilder
      .withIdentifier(identifier)
      .withParameterList(new ParameterListBuilderDirector().buildParams([]))
      .withExecute(
        new ExecuteBuilderDirector().buildExecuteWithDomainEvaluations(executeReturnTypes),
      )
      .build();

    return useCase;
  }

  buildUseCaseWithoutErrorAndReturnTypeVoid({ identifier }: { identifier: string }): TUseCase {
    const useCase = this.useCaseBuilder
      .withIdentifier(identifier)
      .withParameterList(new ParameterListBuilderDirector().buildParams([]))
      .withExecute(new ExecuteBuilderDirector().buildExecuteWithDomainEvaluationsAndNoReturn())
      .build();

    return useCase;
  }
}
