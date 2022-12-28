import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../../core/intermediate-ast/nodes/IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../../core/intermediate-ast/nodes/IntermediateASTNode.js';

export class LanguageNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'language';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TIdentifier, LanguageNode.classNodeName, metadata);
  }
}
