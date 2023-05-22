import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { MissingIdentifierError } from '../../../types.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class IdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'identifier';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TIdentifier, IdentifierNode.classNodeName, metadata);
  }

  public typeCheck(symbolTable: SymbolTable): void {
    const identifierName = this.getIdentifierName();
    const identifierType = symbolTable.lookup(identifierName);
    if (!identifierType) {
      throw new MissingIdentifierError(identifierName, this.getMetadata());
    }
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    this.typeCheck(symbolTable);
  }
}
