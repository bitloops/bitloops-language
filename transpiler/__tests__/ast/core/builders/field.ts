import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
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
    this.type = { [bitloopsPrimaryTypeKey]: primitiveType };
    return this;
  }

  public withBuiltInClassType(type: TBitloopsBuiltInClassesObject): FieldBuilder {
    this.type = { [bitloopsPrimaryTypeKey]: type };
    return this;
  }

  public withBitloopsIdentifierType(type: TBitloopsIdentifierObject): FieldBuilder {
    this.type = { [bitloopsPrimaryTypeKey]: type };
    return this;
  }

  public withArrayPrimaryType(arrayType: ArrayBitloopsPrimTypeObject): FieldBuilder {
    this.type = { [bitloopsPrimaryTypeKey]: arrayType };
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
        ...this.type,
      },
    };
    if (this.optional !== undefined) {
      field[fieldKey][optionalKey] = this.optional;
    }

    return field;
  }
}
