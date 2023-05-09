import { TBitloopsTypesValues } from '../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../semantic-analysis/type-inference/SymbolTable.js';
import { MissingIdentifierError } from '../../types.js';
import { IntermediateASTNode, TNodeMetadata } from './IntermediateASTNode.js';

export abstract class IntermediateASTIdentifierNode extends IntermediateASTNode {
  constructor(nodeType: TBitloopsTypesValues, classNodeName: string, metadata?: TNodeMetadata) {
    super(nodeType, metadata, classNodeName);
  }

  public getIdentifierName(): string {
    const identifierClassNodeName = this.getClassNodeName();
    const identifierValue = this.getValue();
    const identifierName: string = identifierValue[identifierClassNodeName];
    return identifierName;
  }

  //TODO is this needed?
  public typeCheck(symbolTable: SymbolTable): void {
    const identifierName = this.getIdentifierName();
    const identifierType = symbolTable.lookup(identifierName);
    if (!identifierType) {
      throw new MissingIdentifierError(identifierName, this.getMetadata());
    }
  }
}
