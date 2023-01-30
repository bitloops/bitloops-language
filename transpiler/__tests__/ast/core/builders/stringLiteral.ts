import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { StringLiteral } from '../../../../src/types.js';

export class StringLiteralBuilder implements IBuilder<StringLiteral> {
  private value: string;

  public withValue(value: string): StringLiteralBuilder {
    this.value = value;
    return this;
  }

  public build(): StringLiteral {
    const stringLiteral = {
      stringLiteral: this.value,
    };

    return stringLiteral;
  }
}
