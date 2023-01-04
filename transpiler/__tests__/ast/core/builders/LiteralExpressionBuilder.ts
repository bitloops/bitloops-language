import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TLiteralExpression, TLiteralExpressionType } from '../../../../src/types.js';

export class LiteralExpressionBuilder implements IBuilder<TLiteralExpression> {
  private type: TLiteralExpressionType;
  private value: string;

  public withType(type: TLiteralExpressionType): LiteralExpressionBuilder {
    this.type = type;
    return this;
  }

  public withValue(value: string): LiteralExpressionBuilder {
    this.value = value;
    return this;
  }

  public build(): TLiteralExpression {
    return {
      literal: {
        type: this.type,
        value: this.value,
      },
    };
  }
}
