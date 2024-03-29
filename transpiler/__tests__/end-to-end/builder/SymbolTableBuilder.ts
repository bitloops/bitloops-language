// import { InferredTypes } from '../../../src/semantic-analysis/type-inference/ASTTypeInference.js';
// import { SymbolTable } from '../../../src/semantic-analysis/type-inference/SymbolTable.js';

import { TInferredTypes } from '../../../src/semantic-analysis/type-inference/types.js';
import {
  ClassTypeThisSymbolEntry,
  SymbolEntry,
  VariableSymbolEntry,
} from '../../../src/semantic-analysis/type-inference/SymbolEntry.js';
import { PrimitiveSymbolTable } from '../../../src/semantic-analysis/type-inference/SymbolTable.js';

export class SymbolTableBuilder {
  private value: PrimitiveSymbolTable = { locals: {} };

  public insert(name: string, symbolEntry: SymbolEntry): SymbolTableBuilder {
    this.value.locals[name] = symbolEntry;
    return this;
  }

  public insertVariableSymbolEntry(
    name: string,
    type: TInferredTypes,
    isConst: boolean,
  ): SymbolTableBuilder {
    this.value.locals[name] = new VariableSymbolEntry(type, isConst);
    return this;
  }

  public insertThisClassTypeSymbolEntry(type: TInferredTypes): SymbolTableBuilder {
    this.value.locals['this'] = new ClassTypeThisSymbolEntry(type);
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
