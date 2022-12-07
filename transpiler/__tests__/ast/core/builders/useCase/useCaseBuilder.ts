import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TExecute,
  TParameterDependencies,
  TUseCase,
  TUseCaseIdentifier,
  UseCaseIdentifierKey,
  UseCaseKey,
} from '../../../../../src/types.js';

export class UseCaseDeclarationBuilder implements IBuilder<TUseCase> {
  private identifierName: TUseCaseIdentifier;
  private execute: TExecute;
  private parameters: TParameterDependencies;

  public withIdentifier(identifierName: TUseCaseIdentifier): UseCaseDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withExecute(execute: TExecute): UseCaseDeclarationBuilder {
    this.execute = execute;
    return this;
  }

  public withParameterList(parameters: TParameterDependencies) {
    this.parameters = parameters;
    return this;
  }

  public build(): TUseCase {
    const useCase = {
      [UseCaseKey]: {
        [UseCaseIdentifierKey]: this.identifierName,
        execute: this.execute,
        parameters: this.parameters,
      },
    };

    return useCase;
  }
}
