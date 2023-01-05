import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { repoAdapterExpressionKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RepoAdapterExpressionNode extends IntermediateASTNode {
  private static classNodeName = repoAdapterExpressionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoAdapterExpression,
      metadata,
      RepoAdapterExpressionNode.classNodeName,
    );
  }
}
