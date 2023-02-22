import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class StaticNode extends IntermediateASTNode {
  private static classNodeName = 'static';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TStatic, metadata, StaticNode.classNodeName);
  }
}
