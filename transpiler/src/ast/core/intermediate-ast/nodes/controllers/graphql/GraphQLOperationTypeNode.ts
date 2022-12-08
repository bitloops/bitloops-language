import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class GraphQLOperationTypeNode extends IntermediateASTNode {
  private static classNodeName = 'operationType';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TGraphQLControllerOperationType,
      metadata,
      GraphQLOperationTypeNode.classNodeName,
    );
  }

  // getRestMethodValue(): string {
  //   const identifierClassNodeName = this.getClassNodeName();
  //   const identifierValue = this.getValue();
  //   const dtoIdentifierName: string = identifierValue[identifierClassNodeName];
  //   return dtoIdentifierName;
  // }
}
