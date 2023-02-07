import { TApiDeclaration } from '../../../../src/types.js';
import { ApiDeclarationBuilder } from './apiDeclarationBuilder.js';
import { ApiIdentifierBuilder } from './apiIdentifierBuilder.js';

export class ApiDeclarationBuilderDirector {
  private builder: ApiDeclarationBuilder;

  constructor() {
    this.builder = new ApiDeclarationBuilder();
  }

  buildApiDeclaration(apiName: string): TApiDeclaration {
    const apiIdentifier = new ApiIdentifierBuilder().withName(apiName).build();

    return this.builder.withApiIdentifier(apiIdentifier).build();
  }
}
