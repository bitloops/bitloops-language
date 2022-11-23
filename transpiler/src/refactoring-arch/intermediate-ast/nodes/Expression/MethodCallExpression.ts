import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'MethodCallExpression';
export class MethodCallExpressionNode extends ExpressionNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TMethodCallExpression, { lines: lines! }, NAME);
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
}
