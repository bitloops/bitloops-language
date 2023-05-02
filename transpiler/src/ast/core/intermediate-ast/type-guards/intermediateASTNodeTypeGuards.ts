import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { EvaluationNode } from '../nodes/Expression/Evaluation/EvaluationNode.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { LiteralNode } from '../nodes/Expression/Literal/LiteralNode.js';
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
}
