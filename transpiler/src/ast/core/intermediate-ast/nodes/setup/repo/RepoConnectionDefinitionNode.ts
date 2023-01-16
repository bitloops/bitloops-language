import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { RepoConnectionDefinitionKey } from '../../../../../../types.js';
import { IdentifierNode } from '../../identifier/IdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { RepoConnectionExpressionNode } from './RepoConnectionExpressionNode.js';

export class RepoConnectionDefinitionNode extends IntermediateASTNode {
  private static classNodeName = RepoConnectionDefinitionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoConnectionDefinition,
      metadata,
      RepoConnectionDefinitionNode.classNodeName,
    );
  }

  public getIdentifier(): IdentifierNode {
    const identifierNode = this.getChildNodeByType<IdentifierNode>(
      BitloopsTypesMapping.TIdentifier,
    );
    if (!identifierNode) {
      throw new Error('Identifier not found');
    }
    return identifierNode;
  }

  public getExpression(): RepoConnectionExpressionNode {
    const repoConnectionExpression = this.getChildNodeByType<RepoConnectionExpressionNode>(
      BitloopsTypesMapping.TRepoConnectionExpression,
    );
    if (!repoConnectionExpression) {
      throw new Error('Identifier not found');
    }
    return repoConnectionExpression;
  }
}
