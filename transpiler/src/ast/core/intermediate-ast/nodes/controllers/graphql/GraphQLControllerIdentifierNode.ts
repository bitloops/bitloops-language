import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTIdentifierNode } from '../../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';

export class GraphQLControllerIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'graphQLControllerIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TGraphQLControllerIdentifier,
      GraphQLControllerIdentifierNode.classNodeName,
      metadata,
    );
  }
}
