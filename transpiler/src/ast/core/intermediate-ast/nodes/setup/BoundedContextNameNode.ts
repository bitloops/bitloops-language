import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { WordsWithSpacesNode } from './WordsWithSpacesNode.js';

export class BoundedContextNameNode extends IntermediateASTNode {
  private static classNodeName = 'boundedContextName';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TBoundedContextName, metadata, BoundedContextNameNode.classNodeName);
  }

  public getName(): string {
    const wordsWithSpacesNode = this.getChildNodeByType<WordsWithSpacesNode>(
      BitloopsTypesMapping.TWordsWithSpaces,
    );
    if (!wordsWithSpacesNode) {
      throw new Error('Words with spaces not found');
    }
    return wordsWithSpacesNode.getName();
  }
}
