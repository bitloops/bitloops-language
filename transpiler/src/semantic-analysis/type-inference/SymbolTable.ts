import { IntermediateASTNode } from '../../ast/core/intermediate-ast/nodes/IntermediateASTNode.js';
import { SymbolEntry } from './SymbolEntry.js';
import { SymbolTableManager } from './SymbolTableManager.js';

export type PrimitiveSymbolTable = {
  locals: { [name: string]: SymbolEntry };
  children?: { [name: string]: PrimitiveSymbolTable };
};

type TStatementListCounters = {
  ifCounter: number;
  elseCounter: number;
  switchCounter: number;
  ifErrorCounter: number;
  caseCounter: number;
};

export class SymbolTable {
  private localSymbols: { [name: string]: SymbolEntry } = {};
  private childrenScopes: { [name: string]: SymbolTable } = {};
  private statementListCounters: TStatementListCounters;

  constructor(private readonly parent?: SymbolTable, public node?: IntermediateASTNode) {
    this.initializeStatementListCounters();
  }

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

  public lookupLocally(name: string): SymbolEntry | null {
    return this.localSymbols[name] || null;
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

  private initializeStatementListCounters(): void {
    this.statementListCounters = {
      ifCounter: 0,
      elseCounter: 0,
      switchCounter: 0,
      ifErrorCounter: 0,
      caseCounter: 0,
    };
  }

  public increaseElseCounter(): string {
    return `${this.statementListCounters.elseCounter++}`;
  }

  public increaseIfCounter(): string {
    return `${this.statementListCounters.ifCounter++}`;
  }

  public increaseSwitchCounter(): string {
    this.statementListCounters.caseCounter = 0;
    return `${this.statementListCounters.switchCounter++}`;
  }

  public increaseCaseCounter(): string {
    return `${this.statementListCounters.caseCounter++}`;
  }

  public increaseIfErrorCounter(): string {
    return `${this.statementListCounters.ifErrorCounter++}`;
  }

  //returns a list of nodes that contain the position of the keyword in their metadata, ordered from the outer to the inner
  //for example [CommandHandlerNode, ExecuteNode, IfErrorExpressionNode] so that we can find the type of the keyword
  //if the position is not found, returns null
  public findScopeOfKeyword({
    line,
    column,
  }: {
    line: number;
    column: number;
  }): IntermediateASTNode[] | null {
    const nodes = this.findScopeByPosition(undefined, { line, column });
    return nodes;
  }
  private findScopeByPosition(
    nodes: IntermediateASTNode[] = [],
    {
      line,
      column,
    }: {
      line: number;
      column: number;
    },
  ): IntermediateASTNode[] | null {
    if (
      this.node &&
      this.node.getMetadata()?.start.line <= line &&
      this.node.getMetadata()?.start.column <= column &&
      this.node.getMetadata()?.end.line >= line
      //delete '?' when all nodes have metadata
    ) {
      nodes.push(this.node);
    }
    for (const child of Object.values(this.childrenScopes)) {
      child.findScopeByPosition(nodes, { line, column });
    }
    if (nodes.length === 0) {
      return null;
    }
    return nodes;
  }

  //returns the type of the keyword and if it is const or not
  public findTypeOfKeyword(
    keyword: string,
    { line, column }: { line: number; column: number },
  ): {
    type: string | null;
    isConst: boolean | null;
  } {
    const nodes = this.findScopeOfKeyword({ line, column });
    let type;
    let isConst;
    let childScopes: SymbolTable;
    let counter = 0;
    if (!nodes) {
      return null;
    }
    for (const node of nodes) {
      if (counter == 0) childScopes = this.getChildScope(node['className']);
      else {
        for (const child of Object.keys(childScopes.childrenScopes)) {
          const key = child.replace(/\d+$/, ''); //remove digits from the end of the string, for example ifError0 -> ifError
          switch (key) {
            case SymbolTableManager.SCOPE_NAMES.EXECUTE:
              if (childScopes.childrenScopes[SymbolTableManager.SCOPE_NAMES.EXECUTE]?.node === node)
                childScopes = childScopes.getChildScope(SymbolTableManager.SCOPE_NAMES.EXECUTE);
              break;
            case SymbolTableManager.SCOPE_NAMES.SWITCH:
              for (let i = 0; i < childScopes.statementListCounters.switchCounter; i++) {
                const switchKey = SymbolTableManager.SCOPE_NAMES.SWITCH + i;
                if (childScopes.childrenScopes[switchKey]?.node === node)
                  childScopes = childScopes.getChildScope(switchKey);
              }
              break;
            case SymbolTableManager.SCOPE_NAMES.CASE:
              for (let i = 0; i < childScopes.statementListCounters.caseCounter; i++) {
                const caseKey = SymbolTableManager.SCOPE_NAMES.CASE + i;
                if (childScopes.childrenScopes[caseKey]?.node === node)
                  childScopes = childScopes.getChildScope(caseKey);
              }
              break;
            case SymbolTableManager.SCOPE_NAMES.DEFAULT:
              if (childScopes.childrenScopes[SymbolTableManager.SCOPE_NAMES.DEFAULT]?.node === node)
                childScopes = childScopes.getChildScope(SymbolTableManager.SCOPE_NAMES.DEFAULT);
              break;
            case SymbolTableManager.SCOPE_NAMES.IF:
              for (let i = 0; i < childScopes.statementListCounters.ifCounter; i++) {
                const ifKey = SymbolTableManager.SCOPE_NAMES.IF + i;
                if (childScopes.childrenScopes[ifKey]?.node === node)
                  childScopes = childScopes.getChildScope(ifKey);
              }
              break;
            case SymbolTableManager.SCOPE_NAMES.ELSE:
              for (let i = 0; i < childScopes.statementListCounters.elseCounter; i++) {
                const elseKey = SymbolTableManager.SCOPE_NAMES.ELSE + i;
                if (childScopes.childrenScopes[elseKey]?.node === node)
                  childScopes = childScopes.getChildScope(elseKey);
              }
              break;
            case SymbolTableManager.SCOPE_NAMES.DOMAIN_CREATE:
              if (
                childScopes.childrenScopes[SymbolTableManager.SCOPE_NAMES.DOMAIN_CREATE]?.node ===
                node
              )
                childScopes = childScopes.getChildScope(
                  SymbolTableManager.SCOPE_NAMES.DOMAIN_CREATE,
                );
              break;
            case SymbolTableManager.SCOPE_NAMES.HANDLE:
              if (childScopes.childrenScopes[SymbolTableManager.SCOPE_NAMES.HANDLE]?.node === node)
                childScopes = childScopes.getChildScope(SymbolTableManager.SCOPE_NAMES.HANDLE);
              break;
            case SymbolTableManager.SCOPE_NAMES.IF_ERROR:
              for (let i = 0; i++; i < childScopes.statementListCounters.ifErrorCounter) {
                const ifErrorKey = SymbolTableManager.SCOPE_NAMES.IF_ERROR + i;
                if (childScopes.childrenScopes[ifErrorKey]?.node === node)
                  childScopes = childScopes.getChildScope(ifErrorKey);
              }
              break;
          }
        }
      }
      counter++;
    }
    const symbolTableEntry = childScopes?.lookup(keyword);
    if (symbolTableEntry) {
      type = symbolTableEntry.type;
      isConst = symbolTableEntry['isConst'];
    }
    return { type, isConst };
  }
}
