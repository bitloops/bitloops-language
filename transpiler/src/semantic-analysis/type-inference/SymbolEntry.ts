import { InferredTypes } from './ASTTypeInference.js';

export class SymbolEntry {
  constructor(public type: InferredTypes) {}
}

export class ParameterSymbolEntry extends SymbolEntry {
  constructor(type: InferredTypes) {
    super(type);
  }
}

export class ClassTypeParameterSymbolEntry extends SymbolEntry {
  constructor(type: InferredTypes) {
    super(type);
  }
}

export class ClassTypeThisSymbolEntry extends SymbolEntry {
  constructor(type: InferredTypes) {
    super(type);
  }
}

export class VariableSymbolEntry extends SymbolEntry {
  constructor(type: InferredTypes, public isConst: boolean) {
    super(type);
  }
}

export class MethodSymbolEntry extends SymbolEntry {
  constructor(
    type: InferredTypes,
    public parameters: ParameterSymbolEntry[],
    public accessModifier: 'public' | 'private',
    public isStatic: boolean = false,
  ) {
    super(type);
  }
}
