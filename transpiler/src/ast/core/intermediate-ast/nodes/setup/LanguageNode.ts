import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class LanguageNode extends IntermediateASTNode {
  private static classNodeName = 'language';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TLanguage, metadata, LanguageNode.classNodeName);
  }
}
