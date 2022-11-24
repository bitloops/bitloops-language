import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { BitloopsPrimaryTypeNode } from './BitloopsPrimaryTypeNode.js';

export class BuildInClassTypeNode extends BitloopsPrimaryTypeNode {
  private static buildInClassNodeName = 'buildInClassType';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = BuildInClassTypeNode.buildInClassNodeName;
    this.nodeType = BitloopsTypesMapping.TBitloopsBuildInClasses;
  }
}
