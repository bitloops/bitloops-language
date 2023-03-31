import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TExpression, TReturnStatement } from '../../../../../src/types.js';

export class ReturnStatementBuilder implements IBuilder<TReturnStatement> {
  private expression: TExpression;

  public withExpression(expression: TExpression): ReturnStatementBuilder {
    this.expression = expression;
    return this;
  }

  public build(): TReturnStatement {
    const returnStatement = {
      return: this.expression || null,
    };

    return returnStatement;
  }
}
