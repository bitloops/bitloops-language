import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { IntegerLiteral, TIntegerLiteralType } from '../../../../src/types.js';

export class IntegerLiteralBuilder implements IBuilder<IntegerLiteral> {
  private value: string;
  private type: TIntegerLiteralType;

  public withValue(value: string): IntegerLiteralBuilder {
    this.value = value;
    return this;
  }

  public withType(type: TIntegerLiteralType): IntegerLiteralBuilder {
    this.type = type;
    return this;
  }

  public build(): IntegerLiteral {
    const integerLiteral = {
      integerLiteral: {
        value: this.value,
        type: this.type,
      },
    };

    return integerLiteral;
  }
}
