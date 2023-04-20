import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { SymbolTable } from '../../../../../semantic-analysis/type-inference/SymbolTable.js';
import { MissingIdentifierError } from '../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

export class ThisExpressionNode extends ExpressionNode {
  private static nodeName = 'thisExpression';

  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.classNodeName = ThisExpressionNode.nodeName;
    this.nodeType = BitloopsTypesMapping.TThisExpression;
  }

  updateValue(value: string): void {
    const newValue = { [this.getClassNodeName()]: value };
    this.setValue(newValue);
  }

  getIdentifierName(): string {
    return this.getValue()[ThisExpressionNode.nodeName];
  }

  public override typeCheck(symbolTable: SymbolTable): void {
    const identifierName = this.getIdentifierName();
    const identifierType = symbolTable.lookup(identifierName);
    if (!identifierType) {
      throw new MissingIdentifierError(identifierName, this.getMetadata());
    }
    // this.setType(identifierType.type);
  }
}
