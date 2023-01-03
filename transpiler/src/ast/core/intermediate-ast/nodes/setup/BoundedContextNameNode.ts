import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class BoundedContextNameNode extends IntermediateASTNode {
  private static classNodeName = 'boundedContextName';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TBoundedContextName, metadata, BoundedContextNameNode.classNodeName);
  }
}
