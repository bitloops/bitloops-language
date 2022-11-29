import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class DTOIdentifierNode extends IntermediateASTNode {
  private static classNodeName = 'DTOIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDTOIdentifier, metadata, DTOIdentifierNode.classNodeName);
  }

  getIdentifierName(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const dtoIdentifierName: string = identifierValue[identifierClassNodeName];
    return dtoIdentifierName;
  }
}
