import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';

export class IntermediateASTNodeTypeGuards {
  static isBitloopsPrimaryType(node: IntermediateASTNode): node is BitloopsPrimaryTypeNode {
    return node.getNodeType() === BitloopsTypesMapping.TBitloopsPrimaryType;
  }

  static isExpression(node: IntermediateASTNode): node is ExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TExpression;
  }
}
