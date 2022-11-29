import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { LiteralNode } from './LiteralNode.js';

const NAME = 'nullLiteral';
export class NullLiteralNode extends LiteralNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TNullLiteral;
    this.classNodeName = NAME;
  }
}
