import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TExecute,
  TOkErrorReturnTypeValues,
  TParameterDependencies,
  TStatements,
} from '../../../../../src/types.js';

export class UseCaseExecuteBuilder implements IBuilder<TExecute> {
  private statements: TStatements;
  private returnType: TOkErrorReturnTypeValues;
  private parameters: TParameterDependencies;

  public withReturnType(returnType: TOkErrorReturnTypeValues): UseCaseExecuteBuilder {
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
      returnType: this.returnType,
      parameters: this.parameters,
    };

    return useCaseExecute;
  }
}
