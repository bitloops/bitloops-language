import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TExecute,
  TParameterList,
  TUseCase,
  TUseCaseIdentifier,
  UseCaseIdentifierKey,
  UseCaseKey,
} from '../../../../../src/types.js';

export class UseCaseDeclarationBuilder implements IBuilder<TUseCase> {
  private identifierName: TUseCaseIdentifier;
  private execute: TExecute;
  private parameters: TParameterList;

  public withIdentifier(identifierName: TUseCaseIdentifier): UseCaseDeclarationBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withExecute(execute: TExecute): UseCaseDeclarationBuilder {
    this.execute = execute;
    return this;
  }

  public withParameterList(parameters: TParameterList): UseCaseDeclarationBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): TUseCase {
    const useCase = {
      [UseCaseKey]: {
        [UseCaseIdentifierKey]: this.identifierName,
        execute: this.execute,
        ...this.parameters,
      },
    };

    return useCase;
  }
}
