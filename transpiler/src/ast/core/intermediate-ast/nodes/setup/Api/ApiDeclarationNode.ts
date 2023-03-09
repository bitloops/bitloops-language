import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { WordsWithSpacesNode } from '../WordsWithSpacesNode.js';

export class ApiDeclarationNode extends IntermediateASTNode {
  private static classNodeName = 'apiDeclaration';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TApiDeclaration, metadata, ApiDeclarationNode.classNodeName);
  }

  public getApiIdentifier(): string {
    const wordsWithSpacesNode = this.getChildNodeByType<WordsWithSpacesNode>(
      BitloopsTypesMapping.TWordsWithSpaces,
    );
    if (!wordsWithSpacesNode) {
      throw new Error('Words with spaces not found');
    }
    return wordsWithSpacesNode.getName();
  }
}
