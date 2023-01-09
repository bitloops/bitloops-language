import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ControllerResolverKey } from '../../../../../types.js';
import { GraphQLControllerIdentifierNode } from '../controllers/graphql/GraphQLControllerIdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ControllerResolverNode extends IntermediateASTNode {
  private static classNodeName = ControllerResolverKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TControllerResolver, metadata, ControllerResolverNode.classNodeName);
  }

  getGraphQLControllerIdentifier(): GraphQLControllerIdentifierNode {
    const children = this.getChildren();
    const identifiers = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TGraphQLControllerIdentifier,
    );
    if (!identifiers) {
      throw new Error('GraphQL controllers not found');
    }
    return identifiers as GraphQLControllerIdentifierNode;
  }
}
