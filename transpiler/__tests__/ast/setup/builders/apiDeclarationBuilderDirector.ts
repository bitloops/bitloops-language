import { TApiDeclaration } from '../../../../src/types.js';
import { ApiDeclarationBuilder } from './apiDeclarationBuilder.js';
import { WordsWithSpacesBuilder } from './wordsWithSpacesBuilder.js';

export class ApiDeclarationBuilderDirector {
  private builder: ApiDeclarationBuilder;

  constructor() {
    this.builder = new ApiDeclarationBuilder();
  }

  buildApiDeclaration(apiName: string): TApiDeclaration {
    const apiIdentifier = new WordsWithSpacesBuilder().withName(apiName).build();

    return this.builder.withApiIdentifier(apiIdentifier).build();
  }
}
