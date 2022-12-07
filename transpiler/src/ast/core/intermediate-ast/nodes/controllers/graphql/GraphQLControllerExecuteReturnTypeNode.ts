import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class GraphQLControllerExecuteReturnTypeNode extends IntermediateASTNode {
  private static classNodeName = 'returnType';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TGraphQLControllerExecuteReturnType,
      metadata,
      GraphQLControllerExecuteReturnTypeNode.classNodeName,
    );
  }
}
