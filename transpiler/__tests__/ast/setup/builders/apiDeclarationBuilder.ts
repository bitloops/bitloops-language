import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TApiDeclaration, TApiIdentifier } from '../../../../src/types.js';

export class ApiDeclarationBuilder implements IBuilder<TApiDeclaration> {
  private apiIdentifier: TApiIdentifier;

  public withApiIdentifier(apiIdentifier: TApiIdentifier): ApiDeclarationBuilder {
    this.apiIdentifier = apiIdentifier;
    return this;
  }

  public build(): TApiDeclaration {
    const apiDeclaration = {
      apiDeclaration: {
        ...this.apiIdentifier,
      },
    };

    return apiDeclaration;
  }
}
