import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { ExpressionNode } from '../ExpressionNode.js';

export class LogicalExpressionNode extends ExpressionNode {
  private static NAME = 'logicalExpression';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = LogicalExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TLogicalExpression;
  }

  public getExpressionValue(): LogicalExpressionNode {
    return this.getChildren()[0] as LogicalExpressionNode;
  }

  getExpressions(num: 0 | 1 | null): ExpressionNode | ExpressionNode[] {
    const expressions = this.getChildren().filter((child) => child instanceof ExpressionNode);
    if (num === null) {
      return expressions as ExpressionNode[];
    }
    return expressions[num] as ExpressionNode;
  }

  getLeftExpression(): ExpressionNode {
    return (this.getExpressions(0) as ExpressionNode).getChildren()[0] as ExpressionNode;
  }

  getRightExpression(): ExpressionNode {
    return (this.getExpressions(1) as ExpressionNode).getChildren()[0] as ExpressionNode;
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const logicalExpression = this.getExpressionValue();
    if (logicalExpression.isLogicalNotExpression()) {
      const expression = logicalExpression.getChildren()[0] as ExpressionNode;
      expression.addToSymbolTable(symbolTableManager);
    } else {
      const leftExpression = logicalExpression.getLeftExpression();
      const rightExpression = logicalExpression.getRightExpression();
      leftExpression.addToSymbolTable(symbolTableManager);
      rightExpression.addToSymbolTable(symbolTableManager);
    }
  }
}
