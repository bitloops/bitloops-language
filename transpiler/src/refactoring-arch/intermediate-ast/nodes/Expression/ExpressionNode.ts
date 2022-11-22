import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { IntermediateASTNode } from '../IntermediateASTNode.js';

// export class ExpressionNode extends IntermediateASTNode {
//   constructor(lines?: string) {
//     super(BitloopsTypesMapping.TExpression, { lines: lines! }, NAME);
//   }

//   isMethodCallExpression(): this is MethodCallExpressionNode {
//     // TODO change with correct bitloops type mapping
//     return this.getChildren()[0].getNodeType() === 'TMethodCallExpression';
//   }
// }

export abstract class ExpressionNode extends IntermediateASTNode {
  isMethodCallExpression(): this is MethodCallExpressionNode {
    return this.getNodeType() === 'TMethodCallExpression';
  }
}

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

  prepend(prefix: string): void {
    const newVal = prefix + this.getValue();
    this.setValue(newVal);
  }
}
