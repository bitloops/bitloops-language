import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { TWordsWithSpaces } from '../../../../src/types.js';

export class WordsWithSpacesBuilder implements IBuilder<TWordsWithSpaces> {
  private name: string;

  public withName(name: string): WordsWithSpacesBuilder {
    this.name = name;
    return this;
  }

  public build(): TWordsWithSpaces {
    const useCaseExpression = {
      wordsWithSpaces: this.name,
    };

    return useCaseExpression;
  }
}
