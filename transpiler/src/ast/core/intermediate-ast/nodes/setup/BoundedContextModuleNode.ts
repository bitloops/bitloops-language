import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class BoundedContextModuleNode extends IntermediateASTNode {
  private static classNodeName = 'boundedContextModule';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TBoundedContextModule,
      metadata,
      BoundedContextModuleNode.classNodeName,
    );
  }
}
