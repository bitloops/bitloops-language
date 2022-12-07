import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RESTMethodNode extends IntermediateASTNode {
  private static classNodeName = 'method';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRESTMethods, metadata, RESTMethodNode.classNodeName);
  }

  getRestMethodValue(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const dtoIdentifierName: string = identifierValue[identifierClassNodeName];
    return dtoIdentifierName;
  }
}
