import { BitloopsTypesMapping } from '../../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../../IntermediateASTNode.js';

const NAME = 'type';

export class LiteralTypeNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TLiteralType, metadata, NAME);
  }
}
