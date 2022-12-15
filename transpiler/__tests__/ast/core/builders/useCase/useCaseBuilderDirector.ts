import { TUseCase } from '../../../../../src/types.js';
import { ParameterListBuilderDirector } from '../parameterListBuilderDirector.js';
import { UseCaseDeclarationBuilder } from './useCaseBuilder.js';
import { UseCaseExecuteBuilderDirector } from './useCaseExecuteDirector.js';

export class UseCaseBuilderDirector {
  private useCaseBuilder: UseCaseDeclarationBuilder;

  constructor() {
    this.useCaseBuilder = new UseCaseDeclarationBuilder();
  }

  buildUseCaseWithoutErrorAndReturnDTO({ identifier }: { identifier: string }): TUseCase {
    const useCase = this.useCaseBuilder
      .withIdentifier(identifier)
      .withParameterList(new ParameterListBuilderDirector().buildParams([]))
      .withExecute(new UseCaseExecuteBuilderDirector().buildExecuteWithOneReturnDTO())
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
        new UseCaseExecuteBuilderDirector().buildExecuteWithDomainEvaluations(executeReturnTypes),
      )
      .build();

    return useCase;
  }

  buildUseCaseWithoutErrorAndReturnTypeVoid({ identifier }: { identifier: string }): TUseCase {
    const useCase = this.useCaseBuilder
      .withIdentifier(identifier)
      .withParameterList(new ParameterListBuilderDirector().buildParams([]))
      .withExecute(
        new UseCaseExecuteBuilderDirector().buildExecuteWithDomainEvaluationsAndNoReturn(),
      )
      .build();

    return useCase;
  }
}
