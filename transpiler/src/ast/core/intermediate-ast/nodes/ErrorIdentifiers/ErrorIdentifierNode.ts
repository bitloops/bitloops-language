import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ErrorIdentifierNode extends IntermediateASTNode {
  private static classNodeName = 'error';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TErrorIdentifier, metadata, ErrorIdentifierNode.classNodeName);
  }

  getIdentifierName(): string {
    const identifierValue = this.getValue();
    const entityIdentifierName: string = identifierValue[ErrorIdentifierNode.classNodeName];
    return entityIdentifierName;
  }
}
