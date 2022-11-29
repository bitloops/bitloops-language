import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

export class PrimitiveTypeNode extends BitloopsPrimaryTypeNode {
  private static primitiveClassNodeName = 'primitiveType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = PrimitiveTypeNode.primitiveClassNodeName;
    this.nodeType = BitloopsTypesMapping.TBitloopsPrimitives;
  }
}
