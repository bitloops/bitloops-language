import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { setupRepoAdapterDefinitionKey } from '../../../../../../types.js';
import { IdentifierNode } from '../../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { RepoAdapterExpressionNode } from './RepoAdapterExpressionNode.js';

export class SetupRepoAdapterDefinitionNode extends IntermediateASTNode {
  private static classNodeName = setupRepoAdapterDefinitionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TSetupRepoAdapterDefinition,
      metadata,
      SetupRepoAdapterDefinitionNode.classNodeName,
    );
  }

  public getRepoAdapterExpression(): RepoAdapterExpressionNode {
    const repoAdapterExpression = this.getChildNodeByType<RepoAdapterExpressionNode>(
      BitloopsTypesMapping.TRepoAdapterExpression,
    );
    if (!repoAdapterExpression) {
      throw new Error('Repo adapter expression not found');
    }
    return repoAdapterExpression;
  }

  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType<IdentifierNode>(BitloopsTypesMapping.TIdentifier);
    if (!identifier) {
      throw new Error('Repo adapter identifier not found');
    }
    return identifier;
  }
}
