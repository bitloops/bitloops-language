import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class BoundedContextNode extends IntermediateASTNode {
  private static classNodeName = 'boundedContext';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TBoundedContext, metadata, BoundedContextNode.classNodeName);
  }
}
