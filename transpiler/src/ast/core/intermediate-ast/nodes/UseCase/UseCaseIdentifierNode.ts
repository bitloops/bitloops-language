import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { UseCaseIdentifierKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class UseCaseIdentifierNode extends IntermediateASTNode {
  private static classNodeName = UseCaseIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TUseCaseIdentifier, metadata, UseCaseIdentifierNode.classNodeName);
  }

  getIdentifierName(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const useCaseIdentifierName: string = identifierValue[identifierClassNodeName];
    return useCaseIdentifierName;
  }
}
