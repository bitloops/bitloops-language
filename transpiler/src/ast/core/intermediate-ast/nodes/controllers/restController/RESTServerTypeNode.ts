import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RESTServerTypeNode extends IntermediateASTNode {
  private static classNodeName = 'serverType';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TServerType, metadata, RESTServerTypeNode.classNodeName);
  }

  getRestServerTypeValue(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const dtoIdentifierName: string = identifierValue[identifierClassNodeName];
    return dtoIdentifierName;
  }
}
