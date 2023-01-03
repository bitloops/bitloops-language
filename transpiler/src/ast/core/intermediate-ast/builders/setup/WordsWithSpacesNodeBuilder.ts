import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { WordsWithSpacesNode } from '../../nodes/setup/WordsWithSpacesNode.js';
import { IBuilder } from '../IBuilder.js';

export class WordsWithSpacesNodeBuilder implements IBuilder<WordsWithSpacesNode> {
  private wordsWithSpacesNode: WordsWithSpacesNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.wordsWithSpacesNode = new WordsWithSpacesNode(metadata);
  }

  public withName(identifierName: string): WordsWithSpacesNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): WordsWithSpacesNode {
    this.wordsWithSpacesNode.buildLeafValue(this.name);

    return this.wordsWithSpacesNode;
  }
}
