import { IBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/IBuilder.js';
import { TIdentifier, TDTOIdentifier } from '../../../../src/types.js';

export class IdentifierBuilder implements IBuilder<TIdentifier> {
  private name: TIdentifier;

  public withDTOName(name: TDTOIdentifier): IdentifierBuilder {
    this.name = name;
    return this;
  }

  public build(): TIdentifier {
    return this.name;
  }
}
