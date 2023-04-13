import { IntermediateASTNode } from '../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { SymbolEntry } from './SymbolEntry.js';

export type PrimitiveSymbolTable = {
  locals: { [name: string]: SymbolEntry };
  children?: { [name: string]: PrimitiveSymbolTable };
};

export class SymbolTable {
  private localSymbols: { [name: string]: SymbolEntry } = {};
  private childrenScopes: { [name: string]: SymbolTable } = {};

  constructor(private readonly parent?: SymbolTable, public node?: IntermediateASTNode) {}

  public insert(name: string, symbolEntry: SymbolEntry): void {
    this.localSymbols[name] = symbolEntry;
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

  hasChildScope(name: string): boolean {
    return !!this.childrenScopes[name];
  }

  public getJsonValue(): PrimitiveSymbolTable {
    if (Object.keys(this.childrenScopes).length === 0) {
      return { locals: this.localSymbols };
    }
    const childrenValues = Object.entries(this.childrenScopes).reduce(
      (acc, [name, childSymbolTable]) => ({ ...acc, [name]: childSymbolTable.getJsonValue() }),
      {},
    );
    return { locals: this.localSymbols, children: childrenValues };
  }
}
