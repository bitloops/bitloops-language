import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTNode, TNodeMetadata } from '../../IntermediateASTNode.js';
import { SwitchRegularCaseNode } from './SwitchCase.js';

export class SwitchCaseListNode extends IntermediateASTNode {
  private static classNodeName = 'cases';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TSwitchCases, metadata, SwitchCaseListNode.classNodeName);
  }

  public getCases(): SwitchRegularCaseNode[] {
    const switchCases = this.getChildrenNodesByType<SwitchRegularCaseNode>(
      BitloopsTypesMapping.TSwitchCase,
    );
    return switchCases;
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const initialSymbolTable = symbolTableManager.getSymbolTable();
    const switchCounter = symbolTableManager.increaseSwitchCounter();
    const scopeName = SymbolTableManager.SCOPE_NAMES.SWITCH + switchCounter;
    symbolTableManager.createSymbolTableChildScope(scopeName, this);

    this.getCases().forEach((switchCase) => {
      switchCase.addToSymbolTable(symbolTableManager);
    });
    symbolTableManager.setCurrentSymbolTable(initialSymbolTable);
  }
}
