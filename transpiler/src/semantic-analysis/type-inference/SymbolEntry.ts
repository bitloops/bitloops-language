import { TIntegrationEventInfo, TInferredTypes } from './types.js';

export class SymbolEntry {
  constructor(public type: TInferredTypes) {}
}

export class ParameterSymbolEntry extends SymbolEntry {
  constructor(type: TInferredTypes) {
    super(type);
  }
}

export class IntegrationEventParameterSymbolEntry extends SymbolEntry {
  constructor(type: TInferredTypes, public integrationEventInfo: TIntegrationEventInfo) {
    super(type);
  }
}

export class ClassTypeParameterSymbolEntry extends SymbolEntry {
  constructor(type: TInferredTypes) {
    super(type);
  }
}

export class ClassTypeThisSymbolEntry extends SymbolEntry {
  constructor(type: TInferredTypes) {
    super(type);
  }
}

export class VariableSymbolEntry extends SymbolEntry {
  constructor(type: TInferredTypes, public isConst: boolean) {
    super(type);
  }

  public isConstVariable(): boolean {
    return this.isConst;
  }
}

export class MethodCallSymbolEntry extends SymbolEntry {
  constructor(type: TInferredTypes) {
    super(type);
  }
}

export class MemberDotSymbolEntry extends SymbolEntry {
  constructor(type: TInferredTypes) {
    super(type);
  }
}

// export class MethodSymbolEntry extends SymbolEntry {
//   constructor(
//     type: TInferredTypes,
//     public parameters: ParameterSymbolEntry[],
//     public accessModifier: 'public' | 'private',
//     public isStatic: boolean = false,
//   ) {
//     super(type);
//   }
// }
