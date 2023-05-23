import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ThisIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'thisIdentifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TThisIdentifier, ThisIdentifierNode.classNodeName, metadata);
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    this.typeCheck(symbolTable);
  }
}
