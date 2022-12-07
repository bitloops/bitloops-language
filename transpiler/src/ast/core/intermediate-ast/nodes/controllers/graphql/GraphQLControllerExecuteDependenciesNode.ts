import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class GraphQLControllerExecuteDependenciesNode extends IntermediateASTNode {
  private static classNodeName = 'dependencies';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TGraphQLControllerExecuteDependencies,
      metadata,
      GraphQLControllerExecuteDependenciesNode.classNodeName,
    );
  }
}
