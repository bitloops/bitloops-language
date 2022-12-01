import {
  arrayPrimaryTypeKey,
  bitloopsIdentifiersTypeKey,
  primitivesTypeKey,
  TBitloopsBuiltInClasses,
  TBitloopsIdentifier,
  TBitloopsPrimitives,
  TVariable,
} from '../../../../src/types.js';
import { FieldBuilder } from './field.js';

export class FieldBuilderDirector {
  private builder: FieldBuilder;

  constructor() {
    this.builder = new FieldBuilder();
  }

  buildDoubleArrayField({
    name,
    type,
    isOptional,
  }: {
    name: string;
    type: TBitloopsPrimitives;
    isOptional: boolean;
  }): TVariable {
    const field = this.builder
      .withArrayPrimaryType({
        [arrayPrimaryTypeKey]: { [arrayPrimaryTypeKey]: { [primitivesTypeKey]: type } },
      })
      .withName(name)
      .withOptional(isOptional)
      .build();
    return field;
  }

  buildArrayField({
    name,
    type,
    isOptional,
  }: {
    name: string;
    type: TBitloopsPrimitives;
    isOptional: boolean;
  }): TVariable {
    const field = this.builder
      .withArrayPrimaryType({
        [arrayPrimaryTypeKey]: { [primitivesTypeKey]: type },
      })
      .withName(name)
      .withOptional(isOptional)
      .build();
    return field;
  }

  buildPrimitiveField({
    name,
    type,
    isOptional,
  }: {
    name: string;
    type: TBitloopsPrimitives;
    isOptional: boolean;
  }): TVariable {
    const field = this.builder
      .withPrimitivesType({ [primitivesTypeKey]: type })
      .withName(name)
      .withOptional(isOptional)
      .build();
    return field;
  }

  buildIdentifierTypeField({
    name,
    identifier,
    isOptional,
  }: {
    name: string;
    identifier: TBitloopsIdentifier;
    isOptional: boolean;
  }): TVariable {
    const field = this.builder
      .withBitloopsIdentifierType({ [bitloopsIdentifiersTypeKey]: identifier })
      .withName(name)
      .withOptional(isOptional)
      .build();
    return field;
  }

  withBuiltinClassTypeField({
    name,
    type,
    isOptional,
  }: {
    name: string;
    type: TBitloopsBuiltInClasses;
    isOptional: boolean;
  }): TVariable {
    const field = this.builder
      .withBuiltInClassType({ buildInClassType: type })
      .withName(name)
      .withOptional(isOptional)
      .build();
    return field;
  }
}
