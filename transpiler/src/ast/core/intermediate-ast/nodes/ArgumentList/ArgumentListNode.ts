import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ArgumentNode } from './ArgumentNode.js';

const NAME = 'argumentList';

export class ArgumentListNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TArgumentList, metadata, NAME);
  }

  get arguments(): ArgumentNode[] {
    return this.getChildrenNodesByType<ArgumentNode>(BitloopsTypesMapping.TArgument);
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const argumentNodes = this.arguments;
    argumentNodes.forEach((argument) => {
      const argumentExpression = argument.getExpression();
      argumentExpression.addToSymbolTable(symbolTableManager);
    });
  }
}
