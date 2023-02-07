import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class ApiIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'apiIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TErrorIdentifier, ApiIdentifierNode.classNodeName, metadata);
  }
}
