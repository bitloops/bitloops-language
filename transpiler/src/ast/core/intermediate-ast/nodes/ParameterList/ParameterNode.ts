import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import {
  ClassTypeParameterSymbolEntry,
  ParameterSymbolEntry,
} from '../../../../../semantic-analysis/type-inference/SymbolEntry.js';
import { SymbolTableManager } from '../../../../../semantic-analysis/type-inference/SymbolTableManager.js';
import { TInferredTypes } from '../../../../../semantic-analysis/type-inference/types.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { ParameterIdentifierNode } from './ParameterIdentifierNode.js';

const NAME = 'parameter';

export class ParameterNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TParameter, metadata, NAME);
  }

  getIdentifier(): string {
    const parameterIdentifier = this.getChildNodeByType<ParameterIdentifierNode>(
      BitloopsTypesMapping.TParameterDependencyIdentifier,
    );
    return parameterIdentifier.getIdentifier();
  }

  getType(): BitloopsPrimaryTypeNode {
    const parameterType = this.getChildNodeByType<BitloopsPrimaryTypeNode>(
      BitloopsTypesMapping.TBitloopsPrimaryType,
    );
    return parameterType;
  }

  hasRepoPortType(): boolean {
    const parameterType = this.getType();
    return parameterType.isRepoPort();
  }

  addToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    const paramName = this.getIdentifier();
    symbolTable.insert(paramName, new ParameterSymbolEntry(this.getInferredType()));
  }

  addClassTypeParameterToSymbolTable(symbolTableManager: SymbolTableManager): void {
    const symbolTable = symbolTableManager.getSymbolTable();
    const paramName = this.getIdentifier();
    symbolTable.insert(
      SymbolTableManager.THIS + '.' + paramName,
      new ClassTypeParameterSymbolEntry(this.getInferredType()),
    );
  }

  getInferredType(): TInferredTypes {
    const parameterType = this.getType();
    return parameterType.getInferredType();
  }
}
