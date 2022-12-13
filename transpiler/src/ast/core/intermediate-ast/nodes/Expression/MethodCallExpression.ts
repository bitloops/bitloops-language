import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';
import { ThisExpressionNode } from './ThisExpressionNode.js';

const NAME = 'methodCallExpression';
export class MethodCallExpressionNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TMethodCallExpression;
    this.classNodeName = NAME;
  }

  getMethodName(): string {
    const expression = this.getExpression();
    if (expression.isIdentifierExpression()) {
      return expression.identifierName;
    }
    if (expression.isMemberDotExpression()) {
      const identifierExpressionNode = expression.getIdentifierExpression();
      return identifierExpressionNode.identifierName;
    }
    return null;
  }

  getExpression(): ExpressionNode {
    const children = this.getChildren();
    const expressionWrapper = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expressionWrapper) {
      throw new Error('Expression not found');
    }

    const expression = expressionWrapper.getChildren()[0] as ExpressionNode;
    return expression;
  }

  getThisNode(): ThisExpressionNode {
    const expression = this.getExpression();

    if (!expression.isMemberDotExpression()) {
      throw new Error('Expression is not a member dot expression');
    }
    // Find leftmost expression of dotMemberExpression
    const leftMostExpression = expression.getLeftMostExpression();
    if (!leftMostExpression.isThisExpression()) {
      throw new Error('Leftmost expression is not a this expression');
    }
    return leftMostExpression;
  }
}
