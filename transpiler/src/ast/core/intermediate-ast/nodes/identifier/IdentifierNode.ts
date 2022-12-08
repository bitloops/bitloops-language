import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class IdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'identifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TIdentifier, IdentifierNode.classNodeName, metadata);
  }
}
