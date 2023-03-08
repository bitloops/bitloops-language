import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

export class StandardValueTypeNode extends BitloopsPrimaryTypeNode {
  private static nodeName = 'standardValueType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TStandardValueType;
    this.classNodeName = StandardValueTypeNode.nodeName;
  }
}
