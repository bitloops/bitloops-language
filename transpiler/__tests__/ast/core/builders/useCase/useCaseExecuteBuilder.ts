import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TExecute,
  TOkErrorReturnType,
  TParameterList,
  TStatements,
} from '../../../../../src/types.js';

export class UseCaseExecuteBuilder implements IBuilder<TExecute> {
  private statements: TStatements;
  private returnType: TOkErrorReturnType;
  private parameters: TParameterList;

  public withReturnType(returnType: TOkErrorReturnType): UseCaseExecuteBuilder {
    this.returnType = returnType;
    return this;
  }

  public withStatements(statements: TStatements): UseCaseExecuteBuilder {
    this.statements = statements;
    return this;
  }

  public withParameterList(parameters: TParameterList): UseCaseExecuteBuilder {
    this.parameters = parameters;
    return this;
  }

  public build(): TExecute {
    const useCaseExecute = {
      statements: this.statements,
      ...this.returnType,
      ...this.parameters,
    };

    return useCaseExecute;
  }
}
