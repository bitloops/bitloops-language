import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { GraphQLServerOptionsKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class GraphQLServerOptionsNode extends IntermediateASTNode {
  private static classNodeName = GraphQLServerOptionsKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TGraphQLServerOptions,
      metadata,
      GraphQLServerOptionsNode.classNodeName,
    );
  }
}
