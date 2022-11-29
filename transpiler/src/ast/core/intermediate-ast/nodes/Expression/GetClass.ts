import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'getClass';
export class GetClassNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TGetClass;
    this.classNodeName = NAME;
  }
}
