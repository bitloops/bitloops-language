import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { ExpressionNode } from '../../Expression/ExpressionNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';

export class ConditionNode extends IntermediateASTNode {
  private static classNodeName = 'condition';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TCondition, metadata, ConditionNode.classNodeName);
  }

  get expression(): ExpressionNode {
    return this.getChildren()[0] as ExpressionNode;
  }
}
