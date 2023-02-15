import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TExecute, TOkErrorReturnType, TParameter, TStatements } from '../../../../../src/types.js';

export class ExecuteBuilder implements IBuilder<TExecute> {
  private statements: TStatements;
  private returnType: TOkErrorReturnType;
  private parameter?: TParameter;

  public withReturnType(returnType: TOkErrorReturnType): ExecuteBuilder {
    this.returnType = returnType;
    return this;
  }

  public withStatements(statements: TStatements): ExecuteBuilder {
    this.statements = statements;
    return this;
  }

  public withParameter(parameter: TParameter): ExecuteBuilder {
    this.parameter = parameter;
    return this;
  }

  public build(): TExecute {
    let execute = {
      statements: this.statements,
      ...this.returnType,
    };
    if (this.parameter) execute = { ...execute, ...this.parameter };

    return execute;
  }
}
