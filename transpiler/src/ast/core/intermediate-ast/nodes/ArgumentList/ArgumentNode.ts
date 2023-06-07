import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { ExpressionNode } from '../Expression/ExpressionNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

const NAME = 'argument';

export class ArgumentNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TArgument, metadata, NAME);
  }

  public getExpression(): ExpressionNode {
    const expression = this.getChildNodeByType<ExpressionNode>(BitloopsTypesMapping.TExpression);
    if (!expression) {
      throw new Error('Expression not found');
    }
    return expression;
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const argumentExpression = this.getExpression();
    argumentExpression.addToSymbolTable(symbolTableManager);
  }
}
