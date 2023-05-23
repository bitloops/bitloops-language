import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ConditionNode } from '../statements/ifStatement/ConditionNode.js';

const NAME = 'isBrokenIfCondition';
export class IsBrokenConditionNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TIsBrokenIfCondition, metadata, NAME);
  }

  getCondition(): ConditionNode {
    return this.getChildNodeByType<ConditionNode>(BitloopsTypesMapping.TCondition);
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const condition = this.getCondition();
    condition.addToSymbolTable(symbolTableManager);
  }
}
