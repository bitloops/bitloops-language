import { TIntegrationEventInfo, TInferredTypes } from './types.js';

export class SymbolEntry {
  constructor(public type: TInferredTypes) {}
}

export class ParameterSymbolEntry extends SymbolEntry {
  //position is the position of the parameter in the method signature
  //starting from 0
  constructor(type: TInferredTypes, public position?: number) {
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

export class EntityEvaluationSymbolEntry extends SymbolEntry {
  constructor(type: TInferredTypes) {
    super(type);
  }
}

export class ValueObjectEvaluationSymbolEntry extends SymbolEntry {
  constructor(type: TInferredTypes) {
    super(type);
  }
}
