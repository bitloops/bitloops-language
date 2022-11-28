import { IBuilder } from '../../../../src/refactoring-arch/intermediate-ast/builders/IBuilder.js';
import {
  ArrayBitloopsPrimTypeObject,
  bitloopsPrimaryTypeKey,
  fieldKey,
  identifierKey,
  optionalKey,
  TBitloopsBuiltInClassesObject,
  TBitloopsIdentifierObject,
  TBitloopsPrimaryType,
  TBitloopsPrimitivesObject,
  TIdentifier,
  TOptional,
  TVariable,
} from '../../../../src/types.js';

export class FieldBuilder implements IBuilder<TVariable> {
  private type: TBitloopsPrimaryType;
  private name: TIdentifier;
  private optional: TOptional;

  public withPrimitivesType(primitiveType: TBitloopsPrimitivesObject): FieldBuilder {
    this.type = primitiveType;
    return this;
  }

  public withBuiltInClassType(type: TBitloopsBuiltInClassesObject): FieldBuilder {
    this.type = type;
    return this;
  }

  public withBitloopsIdentifierType(type: TBitloopsIdentifierObject): FieldBuilder {
    this.type = type;
    return this;
  }

  public withArrayPrimaryType(arrayType: ArrayBitloopsPrimTypeObject): FieldBuilder {
    this.type = arrayType;
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
      [fieldKey]: {
        [identifierKey]: this.name,
        [bitloopsPrimaryTypeKey]: this.type,
      },
    };
    if (this.optional !== undefined) {
      field[fieldKey][optionalKey] = this.optional;
    }

    return field;
  }
}
