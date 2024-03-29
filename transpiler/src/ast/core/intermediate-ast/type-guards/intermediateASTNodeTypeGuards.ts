import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../nodes/BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { EvaluationNode } from '../nodes/Expression/Evaluation/EvaluationNode.js';
import { ExpressionNode } from '../nodes/Expression/ExpressionNode.js';
import { LiteralNode } from '../nodes/Expression/Literal/LiteralNode.js';
import { MemberDotExpressionNode } from '../nodes/Expression/MemberDot/MemberDotExpressionNode.js';
import { MethodCallExpressionNode } from '../nodes/Expression/MethodCallExpression.js';
import { ThisExpressionNode } from '../nodes/Expression/ThisExpressionNode.js';
import { ToStringNode } from '../nodes/Expression/ToStringNode.js';
import { EqualityExpressionNode } from '../nodes/Expression/equalityExpressionNode.js';
import { IntermediateASTNode } from '../nodes/IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from '../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { AddDomainEventNode } from '../nodes/statements/builtinFunction/AddDomainEventNode.js';
import { ApplyRulesNode } from '../nodes/statements/builtinFunction/ApplyRulesStatementNode.js';
import { IfErrorExpressionNode } from '../nodes/Expression/IfErrorExpressionNode.js';
import { AdditiveExpressionNode } from '../nodes/Expression/AdditiveExpression.js';
import { IdentifierExpressionNode } from '../nodes/Expression/IdentifierExpression.js';

export class IntermediateASTNodeTypeGuards {
  static isBitloopsPrimaryType(node: IntermediateASTNode): node is BitloopsPrimaryTypeNode {
    return node.getNodeType() === BitloopsTypesMapping.TBitloopsPrimaryType;
  }

  static isReturnOkErrorType(node: IntermediateASTNode): node is ReturnOkErrorTypeNode {
    return node.getNodeType() === BitloopsTypesMapping.TOkErrorReturnType;
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

  static isIfErrorExpression(node: IntermediateASTNode): node is IfErrorExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TIfErrorExpression;
  }

  static isThisExpression(node: IntermediateASTNode): node is ThisExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TThisExpression;
  }

  static isEqualityExpression(node: IntermediateASTNode): node is EqualityExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TEqualityExpression;
  }

  static isAdditiveExpression(node: IntermediateASTNode): node is AdditiveExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TAdditiveExpression;
  }

  static isIdentifierExpression(node: IntermediateASTNode): node is IdentifierExpressionNode {
    return node.getNodeType() === BitloopsTypesMapping.TIdentifierExpression;
  }

  static isAddDomainEvent(node: IntermediateASTNode): node is AddDomainEventNode {
    return node.getNodeType() === BitloopsTypesMapping.TAddDomainEvent;
  }

  static isApplyRules(node: IntermediateASTNode): node is ApplyRulesNode {
    return node.getNodeType() === BitloopsTypesMapping.TApplyRules;
  }

  static isToStringMethod(node: IntermediateASTNode): node is ToStringNode {
    return node.getNodeType() === BitloopsTypesMapping.TToStringExpression;
  }
}
