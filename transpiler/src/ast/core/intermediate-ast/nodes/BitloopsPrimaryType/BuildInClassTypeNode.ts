import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

export class BuiltInClassTypeNode extends BitloopsPrimaryTypeNode {
  private static buildInClassNodeName = 'builtInClassType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = BuiltInClassTypeNode.buildInClassNodeName;
    this.nodeType = BitloopsTypesMapping.TBitloopsBuiltInClasses;
  }
}
