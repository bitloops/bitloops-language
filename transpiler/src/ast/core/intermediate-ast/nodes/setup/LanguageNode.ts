import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { languageKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class LanguageNode extends IntermediateASTNode {
  private static classNodeName = languageKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TLanguage, metadata, LanguageNode.classNodeName);
  }
}
