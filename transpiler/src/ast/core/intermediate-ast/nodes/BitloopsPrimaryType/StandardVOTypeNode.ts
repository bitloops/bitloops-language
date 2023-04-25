import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';
import { TStandardVO } from '../../../../../types.js';

export class StandardVOTypeNode extends BitloopsPrimaryTypeNode {
  private static nodeName = 'standardVOType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TStandardVOType;
    this.classNodeName = StandardVOTypeNode.nodeName;
  }

  getValue(): TStandardVO {
    const classNodeName = StandardVOTypeNode.nodeName;
    const value = this.getValue();
    const typeValue = value[classNodeName];
    return typeValue;
  }
}
