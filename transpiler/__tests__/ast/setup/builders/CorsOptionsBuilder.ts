import { StringLiteral, TCorsOptions } from '../../../../src/types.js';
import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';

export class CorsOptionsBuilder implements IBuilder<TCorsOptions> {
  private origin: StringLiteral;

  public withOrigin(origin: StringLiteral): CorsOptionsBuilder {
    this.origin = origin;
    return this;
  }

  public build(): TCorsOptions {
    return { origin: this.origin };
  }
}
