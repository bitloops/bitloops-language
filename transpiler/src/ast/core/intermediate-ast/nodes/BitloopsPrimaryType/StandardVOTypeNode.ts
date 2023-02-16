import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

export class StandardVOTypeNode extends BitloopsPrimaryTypeNode {
  private static nodeName = 'standardVOType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TStandardVOType;
    this.classNodeName = StandardVOTypeNode.nodeName;
  }
}
