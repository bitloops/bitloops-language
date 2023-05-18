import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { bitloopsPrimitivesObj } from '../../../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

export class EqualityExpressionNode extends ExpressionNode {
  private static NAME = 'equalityExpression';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = EqualityExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TEqualityExpression;
  }

  /* 🔧 TODO: make a Base class for left Right expressions and paste this  */
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

  getInferredType(): string {
    return bitloopsPrimitivesObj.bool;
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const leftExpression = this.getLeftExpression();
    leftExpression.addToSymbolTable(symbolTableManager);

    const rightExpression = this.getRightExpression();
    rightExpression.addToSymbolTable(symbolTableManager);
  }
}
