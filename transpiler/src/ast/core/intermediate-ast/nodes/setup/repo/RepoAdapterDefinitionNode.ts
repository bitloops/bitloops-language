import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { repoAdapterDefinitionKey } from '../../../../../../types.js';
import { IdentifierNode } from '../../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { RepoAdapterExpressionNode } from './RepoAdapterExpressionNode.js';

export class RepoAdapterDefinitionNode extends IntermediateASTNode {
  private static classNodeName = repoAdapterDefinitionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoAdapterDefinition,
      metadata,
      RepoAdapterDefinitionNode.classNodeName,
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
