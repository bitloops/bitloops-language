import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

const NAME = 'field';

export class FieldNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TVariable, metadata, NAME);
  }

  getIdentifierNode(): IdentifierNode {
    return this.getChildNodeByType(BitloopsTypesMapping.TIdentifier);
  }

  getTypeNode(): BitloopsPrimaryTypeNode {
    return this.getChildNodeByType(BitloopsTypesMapping.TBitloopsPrimaryType);
  }
}
