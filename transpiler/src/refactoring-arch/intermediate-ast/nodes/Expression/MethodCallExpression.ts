import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'MethodCallExpression';
// This would extend the ExpressionNode class instead
export class MethodCallExpressionNode extends ExpressionNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TMethodCallExpression, { lines: lines! }, NAME);
  }

  getMethodName(): string {
    const children = this.getChildren();
    const methodNameNode = children.find((child) => child.getNodeType() === 'TIdentifier');
    return methodNameNode.getValue();
  }

  prepend(prefix: string): void {
    const newVal = prefix + this.getValue();
    this.setValue(newVal);
  }
}
