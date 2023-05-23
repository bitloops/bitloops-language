import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { MethodCallSymbolEntry } from '../../../../../semantic-analysis/type-inference/SymbolEntry.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { bitloopsPrimitivesObj } from '../../../../../types.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ExpressionNode } from './ExpressionNode.js';

const NAME = 'toStringMethod';
export class ToStringNode extends ExpressionNode {
  constructor(metadata?: TNodeMetadata) {
    super(metadata);
    this.nodeType = BitloopsTypesMapping.TToStringExpression;
    this.classNodeName = NAME;
  }

  getExpression(): ExpressionNode {
    return this.getChildNodeByType(BitloopsTypesMapping.TExpression);
  }

  getInferredType(): string {
    return bitloopsPrimitivesObj.string;
  }

  private joinValueAndToString(value: string): string {
    return `${value}.toString()`;
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const expressionNode = this.getExpression();
    expressionNode.addToSymbolTable(symbolTableManager);
    const key = this.joinValueAndToString(this.getStringValue());
    const symbolTable = symbolTableManager.getSymbolTable();
    symbolTable.insert(key, new MethodCallSymbolEntry(this.getInferredType()));
  }
}
