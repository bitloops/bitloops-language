import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class DependencyInjectionNode extends IntermediateASTNode {
  private static classNodeName = 'dependencyInjection';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TDependencyInjection,
      metadata,
      DependencyInjectionNode.classNodeName,
    );
  }
}
