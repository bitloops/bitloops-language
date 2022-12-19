import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TExecute, TOkErrorReturnType, TParameter, TStatements } from '../../../../../src/types.js';

export class UseCaseExecuteBuilder implements IBuilder<TExecute> {
  private statements: TStatements;
  private returnType: TOkErrorReturnType;
  private parameter?: TParameter;

  public withReturnType(returnType: TOkErrorReturnType): UseCaseExecuteBuilder {
    this.returnType = returnType;
    return this;
  }

  public withStatements(statements: TStatements): UseCaseExecuteBuilder {
    this.statements = statements;
    return this;
  }

  public withParameter(parameter: TParameter): UseCaseExecuteBuilder {
    this.parameter = parameter;
    return this;
  }

  public build(): TExecute {
    let useCaseExecute = {
      statements: this.statements,
      ...this.returnType,
    };
    if (this.parameter) useCaseExecute = { ...useCaseExecute, ...this.parameter };

    return useCaseExecute;
  }
}
