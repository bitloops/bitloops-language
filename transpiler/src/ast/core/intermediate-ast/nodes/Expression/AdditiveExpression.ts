import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { TInferredTypes } from '../../../../../semantic-analysis/type-inference/types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

// This would extend the ExpressionNode class instead
export class AdditiveExpressionNode extends ExpressionNode {
  private static NAME = 'additiveExpression';
  //  constructor(metadata?: TNodeMetadata) {

  //   super(BitloopsTypesMapping.TAdditiveExpression, { lines: lines! }, NAME);
  // }

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = AdditiveExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TAdditiveExpression;
  }

  /* 🔧 TODO: implement left and right getters */
  getExpressions(num: 0 | 1 | null): ExpressionNode | ExpressionNode[] {
    const expressions = this.getChildren().filter((child) => child instanceof ExpressionNode);
    if (num === null) {
      return expressions as ExpressionNode[];
    }
    return expressions[num] as ExpressionNode;
  }

  public getInferredType(symbolTableManager: SymbolTableManager): TInferredTypes {
    const left = this.getExpressions(0) as ExpressionNode;
    const right = this.getExpressions(1) as ExpressionNode;
    if (left && right) {
      const leftType = left.getInferredType(symbolTableManager);
      const rightType = right.getInferredType(symbolTableManager);
      if (leftType === rightType) {
        return leftType;
      }
    }
    throw new Error('Inferred type of additive expression is not the same');
  }
}
