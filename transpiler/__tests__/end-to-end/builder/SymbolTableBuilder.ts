// import { InferredTypes } from '../../../src/semantic-analysis/type-inference/ASTTypeInference.js';
// import { SymbolTable } from '../../../src/semantic-analysis/type-inference/SymbolTable.js';

import { InferredTypes } from '../../../src/semantic-analysis/type-inference/ASTTypeInference.js';
import {
  SymbolEntry,
  VariableSymbolEntry,
} from '../../../src/semantic-analysis/type-inference/SymbolEntry.js';
import { PrimitiveSymbolTable } from '../../../src/semantic-analysis/type-inference/SymbolTable.js';

// class SymbolEntry {
//   constructor(public type: InferredTypes) {}
// }
// export class SymbolTableBuilder {
//   private localSymbols: { [name: string]: SymbolEntry } = {};
//   private childrenScopes: { [name: string]: SymbolTable } = {};

//   constructor(private readonly parent?: SymbolTable, public node?: IntermediateASTNode) {}

//   public insert(name: string, type: InferredTypes): void {
//     this.localSymbols[name] = { type };
//   }

//   public lookup(name: string): SymbolEntry | null {
//     const symbol = this.localSymbols[name];
//     if (symbol) {
//       return symbol;
//     }
//     if (this.parent) {
//       return this.parent.lookup(name);
//     }
//     return null;
//   }

//   public createChildScope(name: string): SymbolTable {
//     const childScope = new SymbolTable(this);
//     this.childrenScopes[name] = childScope;
//     return childScope;
//   }

//   public addChildScope(name: string): SymbolTable {
//     const childScope = new SymbolTable(this);
//     this.childrenScopes[name] = childScope;
//     return this;
//   }

//   public getChildScope(name: string): SymbolTable | null {
//     return this.childrenScopes[name] || null;
//   }

//   public getParentScope(): SymbolTable | null {
//     return this.parent || null;
//   }

//   hasChildScope(name: string): boolean {
//     return !!this.childrenScopes[name];
//   }
// }

export class SymbolTableBuilder {
  private value: PrimitiveSymbolTable = { locals: {} };

  public insert(name: string, symbolEntry: SymbolEntry): SymbolTableBuilder {
    this.value.locals[name] = symbolEntry;
    return this;
  }

  public insertVariableSymbolEntry(
    name: string,
    type: InferredTypes,
    isConst: boolean,
  ): SymbolTableBuilder {
    this.value.locals[name] = new VariableSymbolEntry(type, isConst);
    return this;
  }

  public insertChildScope(name: string, child: SymbolTableBuilder): SymbolTableBuilder {
    if (!this.value.children) {
      this.value.children = {};
    }
    this.value.children[name] = child.build();
    return this;
  }

  public build(): PrimitiveSymbolTable {
    return this.value;
  }
}
