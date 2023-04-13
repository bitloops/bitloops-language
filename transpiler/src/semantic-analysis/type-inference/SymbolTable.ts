import { IntermediateASTNode } from '../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { TInferenceType } from './ASTTypeInference.js';

class SymbolEntry {
  constructor(public type: TInferenceType) {}
}

export class SymbolTable {
  private localSymbols: { [name: string]: SymbolEntry } = {};
  private childrenScopes: { [name: string]: SymbolTable } = {};

  constructor(private readonly parent?: SymbolTable, private node?: IntermediateASTNode) {}

  public insert(name: string, type: TInferenceType): void {
    this.localSymbols[name] = { type };
  }

  public lookup(name: string): SymbolEntry | null {
    const symbol = this.localSymbols[name];
    if (symbol) {
      return symbol;
    }
    if (this.parent) {
      return this.parent.lookup(name);
    }
    return null;
  }

  public createChildScope(name: string, node?: IntermediateASTNode): SymbolTable {
    const childScope = new SymbolTable(this, node);
    this.childrenScopes[name] = childScope;
    return childScope;
  }

  public getChildScope(name: string): SymbolTable | null {
    return this.childrenScopes[name] || null;
  }

  public getParentScope(): SymbolTable | null {
    return this.parent || null;
  }
}
