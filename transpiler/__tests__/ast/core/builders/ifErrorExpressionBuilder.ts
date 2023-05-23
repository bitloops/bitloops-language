import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TExpression, TAnonymousFunction, TIfErrorExpression } from '../../../../src/types.js';

export class IfErrorExpressionBuilder implements IBuilder<TIfErrorExpression> {
  private leftExpression: TExpression;
  private anonymousFunction?: TAnonymousFunction;

  public withExpression(expr: TExpression): IfErrorExpressionBuilder {
    this.leftExpression = expr;
    return this;
  }

  public withAnonymousFunction(anonymousFunction: TAnonymousFunction): IfErrorExpressionBuilder {
    this.anonymousFunction = anonymousFunction;
    return this;
  }

  public build(): TIfErrorExpression {
    const ifErrorExpression: TIfErrorExpression = {
      ifErrorExpression: {
        ...this.leftExpression,
      },
    };

    if (this.anonymousFunction) {
      ifErrorExpression.ifErrorExpression.anonymousFunction =
        this.anonymousFunction.anonymousFunction;
    }

    return ifErrorExpression;
  }
}
