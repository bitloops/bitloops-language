import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTNode } from './IntermediateASTNode.js';

const NAME = 'Expression';
export class ExpressionNode extends IntermediateASTNode {
  constructor(lines?: string) {
    super(BitloopsTypesMapping.TExpression, { lines: lines! }, NAME);
  }

  isMethodCallExpression(): this is MethodCallExpressionNode {
    // TODO change with correct bitloops type mapping
    return this.getChildren()[0].getNodeType() === 'TMethodCallExpression';
  }
}

// Todo check if abstract is more appropriate since expression not a concrete type
// differentiate if a node is a expression or a statement (or anything abstract)
// by using instanceof instead of nodeType
// export abstract class ExpressionNode extends IntermediateASTNode {
//   isMethodCallExpression(): this is MethodCallExpressionNode {
//     return this.getNodeType() === 'TMethodCallExpression';
//   }
// }

// This would extend the ExpressionNode class instead
export class MethodCallExpressionNode extends IntermediateASTNode {
  // TODO add more properties and fix methodName
  constructor(lines?: string) {
    // super(BitloopsTypesMapping.TMethodCallExpression, { lines: lines! }, NAME);
    super('TMethodCall', { lines: lines! }, 'MethodCallExpression');
  }

  getMethodName(): string {
    const children = this.getChildren();
    const methodNameNode = children.find((child) => child.getNodeType() === 'TIdentifier');
    return methodNameNode.getValue();
  }

  prepend(prefix): void {
    const newVal = prefix + this.getValue();
    this.setValue(newVal);
  }
}
