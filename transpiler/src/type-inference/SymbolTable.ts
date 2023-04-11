interface ISymbol {
  name: string;
  type: string;
}

export class SymbolTable {
  private symbols: { [name: string]: ISymbol } = {};
  private children: { [name: string]: SymbolTable } = {};
  constructor(private readonly parent?: SymbolTable) {}
  public define(name: string, type: string): void {
    this.symbols[name] = { name, type };
  }
  public lookup(name: string): ISymbol | null {
    const symbol = this.symbols[name];
    if (symbol) {
      return symbol;
    }
    if (this.parent) {
      return this.parent.lookup(name);
    }
    return null;
  }
  public createChildScope(name: string): SymbolTable {
    const childScope = new SymbolTable(this);
    this.children[name] = childScope;
    return childScope;
  }
  public getChildScope(name: string): SymbolTable | null {
    return this.children[name] || null;
  }
}
