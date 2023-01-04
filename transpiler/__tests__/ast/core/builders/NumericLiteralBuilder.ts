import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { DecimalLiteral, IntegerLiteral, TNumericLiteral } from '../../../../src/types.js';

export class NumericLiteralBuilder implements IBuilder<TNumericLiteral> {
  private integer: IntegerLiteral;
  private decimal: DecimalLiteral;

  public withInteger(value: IntegerLiteral): NumericLiteralBuilder {
    this.integer = value;
    return this;
  }

  public withDecimal(value: DecimalLiteral): NumericLiteralBuilder {
    this.decimal = value;
    return this;
  }

  public build(): TNumericLiteral {
    const numericLiteral = this.integer || this.decimal;

    return { numericLiteral };
  }
}
