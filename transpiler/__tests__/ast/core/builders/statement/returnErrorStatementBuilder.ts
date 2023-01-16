import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { returnErrorKey, TExpression, TReturnErrorStatement } from '../../../../../src/types.js';

export class ReturnErrorStatementBuilder implements IBuilder<TReturnErrorStatement> {
  private expression: TExpression;

  public withExpression(expression: TExpression): ReturnErrorStatementBuilder {
    this.expression = expression;
    return this;
  }

  public build(): TReturnErrorStatement {
    const retunStatement = {
      [returnErrorKey]: this.expression,
    };

    return retunStatement;
  }
}
