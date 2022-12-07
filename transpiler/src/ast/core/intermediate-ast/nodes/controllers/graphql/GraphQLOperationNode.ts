import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class GraphQLOperationNode extends IntermediateASTNode {
  private static classNodeName = 'operation';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TGraphQLController, metadata, GraphQLOperationNode.classNodeName);
  }

  // getRestMethodValue(): string {
  //   const identifierClassNodeName = this.getClassNodeName();
  //   const identifierValue = this.getValue();
  //   const dtoIdentifierName: string = identifierValue[identifierClassNodeName];
  //   return dtoIdentifierName;
  // }
}
