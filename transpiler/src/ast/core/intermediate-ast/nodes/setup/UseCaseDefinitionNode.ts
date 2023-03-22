import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class UseCaseDefinitionNode extends IntermediateASTNode {
  private static classNodeName = 'useCaseDefinition';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TUseCaseDefinition, metadata, UseCaseDefinitionNode.classNodeName);
  }

  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType(BitloopsTypesMapping.TIdentifier);
    if (!identifier) {
      throw new Error('Identifier not found');
    }
    return identifier as IdentifierNode;
  }
}
