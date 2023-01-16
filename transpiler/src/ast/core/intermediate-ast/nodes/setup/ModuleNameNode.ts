import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { WordsWithSpacesNode } from './WordsWithSpacesNode.js';

export class ModuleNameNode extends IntermediateASTNode {
  private static classNodeName = 'moduleName';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TModuleName, metadata, ModuleNameNode.classNodeName);
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
