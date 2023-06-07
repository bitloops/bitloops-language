import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { MissingIdentifierError } from '../../../types.js';
import { IntermediateASTIdentifierNode } from '../IntermediateASTIdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ErrorIdentifierNode extends IntermediateASTIdentifierNode {
  private static classNodeName = 'error';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TErrorIdentifier, ErrorIdentifierNode.classNodeName, metadata);
  }

  /**
   * error has the form: DomainError.errorIdentifierName or ApplicationError.errorIdentifierName
   * we split by dot and return the second part
   *
   * //TODO in symbol table we have form: errorIdentifierName
   * maybe we should have the form:: DomainError.errorIdentifierName or ApplicationError.errorIdentifierName
   */
  public getErrorNameAfterDot(): string {
    const identifierNameWithDot = this.getIdentifierName();
    const identifierNameWithoutDot = this.getIdentifierName().split('.');
    if (identifierNameWithoutDot.length === 2) {
      return identifierNameWithoutDot[1];
    }
    return identifierNameWithDot;
  }

  public typeCheck(symbolTable: SymbolTable): void {
    const identifierName = this.getErrorNameAfterDot();
    //add check that [1] exists
    const identifierExists: boolean = symbolTable.getParentScope().hasChildScope(identifierName);
    if (!identifierExists) {
      throw new MissingIdentifierError(identifierName, this.getMetadata());
    }
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    this.typeCheck(symbolTable);
  }
}
