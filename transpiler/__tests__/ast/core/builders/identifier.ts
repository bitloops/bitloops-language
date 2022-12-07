import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TIdentifier, TDTOIdentifier, TPropsIdentifier } from '../../../../src/types.js';

export class IdentifierBuilder implements IBuilder<TIdentifier> {
  private name: TIdentifier;

  public withDTOName(name: TDTOIdentifier): IdentifierBuilder {
    this.name = name;
    return this;
  }

  withPropsName(name: TPropsIdentifier): IdentifierBuilder {
    this.name = name;
    return this;
  }
  withName(name: string): IdentifierBuilder {
    this.name = name;
    return this;
  }

  withName(name: TIdentifier): IdentifierBuilder {
    this.name = name;
    return this;
  }

  public build(): TIdentifier {
    return this.name;
  }
}
