import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TExecute,
  TOkErrorReturnType,
  TParameterDependencies,
  TStatements,
} from '../../../../../src/types.js';

export class UseCaseExecuteBuilder implements IBuilder<TExecute> {
  private statements: TStatements;
  private returnType: TOkErrorReturnType;
  private parameters: TParameterDependencies;

  public withReturnType(returnType: TOkErrorReturnType): UseCaseExecuteBuilder {
    this.returnType = returnType;
    return this;
  }

  public withStatements(statements: TStatements): UseCaseExecuteBuilder {
    this.statements = statements;
    return this;
  }

  public withParameterList(parameters: TParameterDependencies): UseCaseExecuteBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): TExecute {
    const useCaseExecute = {
      statements: this.statements,
      ...this.returnType,
      parameters: this.parameters,
    };

    return useCaseExecute;
  }
}
