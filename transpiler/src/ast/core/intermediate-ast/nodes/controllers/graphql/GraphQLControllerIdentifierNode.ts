import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class GraphQLControllerIdentifierNode extends IntermediateASTNode {
  private static classNodeName = 'RESTControllerIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRESTControllerIdentifier,
      metadata,
      GraphQLControllerIdentifierNode.classNodeName,
    );
  }

  getIdentifierName(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const dtoIdentifierName: string = identifierValue[identifierClassNodeName];
    return dtoIdentifierName;
  }
}
