import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { GraphQLServerInstantiationOptionsKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class GraphQLServerInstantiationOptionsNode extends IntermediateASTNode {
  private static classNodeName = GraphQLServerInstantiationOptionsKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TGraphQLServerInstantiationOptions,
      metadata,
      GraphQLServerInstantiationOptionsNode.classNodeName,
    );
  }
}
