import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TApiDeclaration, TWordsWithSpaces } from '../../../../src/types.js';

export class ApiDeclarationBuilder implements IBuilder<TApiDeclaration> {
  private apiIdentifier: TWordsWithSpaces;

  public withApiIdentifier(apiIdentifier: TWordsWithSpaces): ApiDeclarationBuilder {
    this.apiIdentifier = apiIdentifier;
    return this;
  }

  public build(): TApiDeclaration {
    const apiDeclaration: TApiDeclaration = {
      apiDeclaration: this.apiIdentifier,
    };

    return apiDeclaration;
  }
}
