import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

export class LeftExpressionNode extends ExpressionNode {
  private static NAME = 'left';
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = LeftExpressionNode.NAME;
    this.nodeType = BitloopsTypesMapping.TExpression;
  }

  public getExpression(): ExpressionNode {
    return this.getChildNodeByType<ExpressionNode>(BitloopsTypesMapping.TExpression);
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const expression = this.getExpression();
    expression.addToSymbolTable(symbolTableManager);
  }
}
