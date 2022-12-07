import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class GraphQLInputTypeNode extends IntermediateASTNode {
  private static classNodeName = 'outputType';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TGraphQLControllerInputType,
      metadata,
      GraphQLInputTypeNode.classNodeName,
    );
  }

  // getRestMethodValue(): string {
  //   const identifierClassNodeName = this.getClassNodeName();
  //   const identifierValue = this.getValue();
  //   const dtoIdentifierName: string = identifierValue[identifierClassNodeName];
  //   return dtoIdentifierName;
  // }
}
