import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

export class ArrayPrimaryTypeNode extends BitloopsPrimaryTypeNode {
  private static arrayClassNodeName = 'arrayPrimaryType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = ArrayPrimaryTypeNode.arrayClassNodeName;
    this.nodeType = BitloopsTypesMapping.ArrayBitloopsPrimType;
  }
}
