import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { repoAdapterExpressionKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { BoundedContextModuleNode } from '../BoundedContextModuleNode.js';

export class RepoAdapterExpressionNode extends IntermediateASTNode {
  private static classNodeName = repoAdapterExpressionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoAdapterExpression,
      metadata,
      RepoAdapterExpressionNode.classNodeName,
    );
  }

  public getBoundedContextModule(): BoundedContextModuleNode {
    const boundedContextModule = this.getChildNodeByType<BoundedContextModuleNode>(
      BitloopsTypesMapping.TBoundedContextModule,
    );
    if (!boundedContextModule) {
      throw new Error('BoundedContext module not found');
    }
    return boundedContextModule;
  }
}
