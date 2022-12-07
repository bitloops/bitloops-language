import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class EntityIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'entityIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEntityIdentifier, EntityIdentifierNode.classNodeName, metadata);
  }
}
