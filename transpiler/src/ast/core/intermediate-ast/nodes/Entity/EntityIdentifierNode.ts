import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class EntityIdentifierNode extends IntermediateASTNode {
  private static classNodeName = 'entityIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TEntityIdentifier, metadata, EntityIdentifierNode.classNodeName);
  }

  getIdentifierName(): string {
    const identifierValue = this.getValue();
    const entityIdentifierName: string = identifierValue[EntityIdentifierNode.classNodeName];
    return entityIdentifierName;
  }
}
