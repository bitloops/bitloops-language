import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'methodCallExpression';
export class MethodCallExpressionNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TMethodCallExpression;
    this.classNodeName = NAME;
  }

  getExpression(): ExpressionNode {
    const children = this.getChildren();
    const expression = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TExpression,
    );
    if (!expression) {
      throw new Error('Expression not found');
    }
    return expression as ExpressionNode;
  }

  getExpressionIdentifier(): string {
    const children = this.getChildren();
    const methodNameNode = children.find((child) => child.getNodeType() === 'TIdentifier');
    return methodNameNode.getValue();
  }

  prependMethodName(prefix: string): void {
    // TODO fix
    const newVal = prefix + this.getValue();
    this.setValue(newVal);
  }

  getMethodName(): string {
    const expression = this.getExpression();
    if (expression.isIdentifierExpression()) {
      return expression.identifierName;
    }
    if (expression.isMemberDotExpression()) {
      return expression.getIdentifierExpression().identifierName;
    }
    return this.getValue();
  }
}
