import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TBitloopsPrimaryType } from '../../../../src/types.js';

export class BitloopsPrimaryTypeBuilder implements IBuilder<TBitloopsPrimaryType> {
  private type: TBitloopsPrimaryType;

  public withType(type: TBitloopsPrimaryType): BitloopsPrimaryTypeBuilder {
    this.type = type;
    return this;
  }

  public build(): TBitloopsPrimaryType {
    return this.type;
  }
}
