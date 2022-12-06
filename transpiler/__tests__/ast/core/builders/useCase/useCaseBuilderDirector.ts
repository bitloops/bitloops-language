import { TUseCase } from '../../../../../src/types.js';
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
      .withParameterList([])
      .withExecute(new UseCaseExecuteBuilderDirector().buildExecuteWithOneReturnDTO())
      .build();

    return useCase;
  }
}
