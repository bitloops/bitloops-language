import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class GraphQLOperationNameNode extends IntermediateASTNode {
  private static classNodeName = 'operationName';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TGraphQLControllerOperationName,
      metadata,
      GraphQLOperationNameNode.classNodeName,
    );
  }

  // getRestMethodValue(): string {
  //   const identifierClassNodeName = this.getClassNodeName();
  //   const identifierValue = this.getValue();
  //   const dtoIdentifierName: string = identifierValue[identifierClassNodeName];
  //   return dtoIdentifierName;
  // }
}
