import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TIdentifier, TExtendsRepoPorts, identifierKey } from '../../../../src/types.js';

export class ExtendsRepoPortBuilder implements IBuilder<TExtendsRepoPorts> {
  private identifiers: TIdentifier[];

  public withIdentifier(identifiers: TIdentifier[]): ExtendsRepoPortBuilder {
    this.identifiers = identifiers;
    return this;
  }

  public build(): TExtendsRepoPorts {
    const extendsRepoPortRes: TExtendsRepoPorts = this.identifiers.map((identifier) => {
      return {
        [identifierKey]: identifier,
      };
    });
    return extendsRepoPortRes;
  }
}
