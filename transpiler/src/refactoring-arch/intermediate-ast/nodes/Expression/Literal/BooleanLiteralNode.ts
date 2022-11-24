import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { LiteralNode } from './LiteralNode.js';

const NAME = 'booleanLiteral';
export class BooleanLiteralNode extends LiteralNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TBooleanLiteral;
    this.classNodeName = NAME;
  }
}
