import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { RepoConnectionExpressionKey } from '../../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class RepoConnectionExpressionNode extends IntermediateASTNode {
  private static classNodeName = RepoConnectionExpressionKey;

  constructor(metadata?: TNodeMetadata) {
    super(
      BitloopsTypesMapping.TRepoConnectionExpression,
      metadata,
      RepoConnectionExpressionNode.classNodeName,
    );
  }
}
