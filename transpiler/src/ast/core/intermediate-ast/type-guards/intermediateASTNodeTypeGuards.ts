import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { EvaluationNode } from '../nodes/Expression/Evaluation/EvaluationNode.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { LiteralNode } from '../nodes/Expression/Literal/LiteralNode.js';
import { MemberDotExpressionNode } from '../nodes/Expression/MemberDot/MemberDotExpression.js';
import { MethodCallExpressionNode } from '../nodes/Expression/MethodCallExpression.js';
import { ThisExpressionNode } from '../nodes/Expression/ThisExpressionNode.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';

export class IntermediateASTNodeTypeGuards {
  static isBitloopsPrimaryType(node: IntermediateASTNode): node is BitloopsPrimaryTypeNode {
    return node.getNodeType() === BitloopsTypesMapping.TBitloopsPrimaryType;
  }

  static isExpression(node: IntermediateASTNode): node is ExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TExpression;
  }

  static isEvaluation(node: IntermediateASTNode): node is EvaluationNode {
    return node.getNodeType() === BitloopsTypesMapping.TEvaluation;
  }

  static isLiteral(node: IntermediateASTNode): node is LiteralNode {
    return node.getNodeType() === BitloopsTypesMapping.TLiteral;
  }

  static isMethodCallExpression(node: IntermediateASTNode): node is MethodCallExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TMethodCallExpression;
  }

  static isMemberDotExpression(node: IntermediateASTNode): node is MemberDotExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TMemberDotExpression;
  }

  static isThisExpression(node: IntermediateASTNode): node is ThisExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TThisExpression;
  }
}
