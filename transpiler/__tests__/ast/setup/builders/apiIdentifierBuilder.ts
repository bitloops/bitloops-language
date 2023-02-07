import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TApiIdentifier } from '../../../../src/types.js';

export class ApiIdentifierBuilder implements IBuilder<TApiIdentifier> {
  private name: string;

  public withName(name: string): ApiIdentifierBuilder {
    this.name = name;
    return this;
  }

  public build(): TApiIdentifier {
    const apiIdentifier = {
      apiIdentifier: this.name,
    };

    return apiIdentifier;
  }
}
