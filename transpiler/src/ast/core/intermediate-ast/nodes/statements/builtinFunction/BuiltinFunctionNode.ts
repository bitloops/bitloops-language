import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { SymbolTableManager } from '../../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { TNodeMetadata } from '../../IntermediateASTNode.js';
import { StatementNode } from '../Statement.js';

export class BuiltInFunctionNode extends StatementNode {
  private static classNodeName = 'builtInFunction';
  constructor(metadata: TNodeMetadata) {
    super(BitloopsTypesMapping.TBuiltInFunction, metadata, BuiltInFunctionNode.classNodeName);
  }

  public addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const specificFunction = this.getChildren()[0];
    specificFunction.addToSymbolTable(symbolTableManager);
  }
}
