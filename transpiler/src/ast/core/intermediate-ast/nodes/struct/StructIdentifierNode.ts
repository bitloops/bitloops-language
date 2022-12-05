import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { structIdentifierKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class StructIdentifierNode extends IntermediateASTNode {
  private static classNodeName = structIdentifierKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TStructIdentifier, metadata, StructIdentifierNode.classNodeName);
  }

  getIdentifierName(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const structIdentifierName: string = identifierValue[identifierClassNodeName];
    return structIdentifierName;
  }
}
