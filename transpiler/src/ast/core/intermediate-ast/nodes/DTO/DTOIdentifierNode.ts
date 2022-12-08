import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class DTOIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'DTOIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDTOIdentifier, DTOIdentifierNode.classNodeName, metadata);
  }
}
