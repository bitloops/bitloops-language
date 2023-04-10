import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { dependencyInjectionKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class DependencyInjectionsNode extends IntermediateASTNode {
  private static classNodeName = dependencyInjectionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TDependencyInjections,
      metadata,
      DependencyInjectionsNode.classNodeName,
    );
  }
}
