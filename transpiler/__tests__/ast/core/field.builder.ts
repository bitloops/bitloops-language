import { IBuilder } from '../../../src/refactoring-arch/intermediate-ast/builders/IBuilder.js';
import {
  DTOIdentifierKey,
  fieldsKey,
  identifierKey,
  optionalKey,
  TBitloopsPrimaryType,
  TIdentifier,
  TOptional,
  TVariable,
} from '../../../src/types.js';

export class FieldBuilder implements IBuilder<TVariable> {
  private type: TBitloopsPrimaryType;
  private name: TIdentifier;
  private optional: TOptional;

  public withType(identifierName: TBitloopsPrimaryType): FieldBuilder {
    this.type = identifierName;
    return this;
  }

  public withName(name: TIdentifier): FieldBuilder {
    this.name = name;
    return this;
  }

  public withOptional(optional: TOptional): FieldBuilder {
    this.optional = optional;
    return this;
  }

  public build(): TVariable {
    const field = {
      [identifierKey]: this.name,
      ...this.type,
    };
    if (this.optional !== undefined) {
      field[optionalKey] = this.optional;
    }

    return field;
  }
}
