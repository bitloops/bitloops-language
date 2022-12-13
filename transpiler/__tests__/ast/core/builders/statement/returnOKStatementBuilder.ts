import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { returnOKKey, TExpression, TReturnOKStatement } from '../../../../../src/types.js';

export class ReturnOKStatementBuilder implements IBuilder<TReturnOKStatement> {
  private expression: TExpression;

  public withExpression(expression: TExpression): ReturnOKStatementBuilder {
    this.expression = expression;
    return this;
  }

  public build(): TReturnOKStatement {
    const retunStatement = {
      [returnOKKey]: this.expression,
    };

    return retunStatement;
  }
}
