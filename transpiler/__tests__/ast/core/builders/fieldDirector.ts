import {
  arrayPrimaryTypeKey,
  bitloopsIdentifiersTypeKey,
  primitivesTypeKey,
  TBitloopsIdentifier,
  TBitloopsPrimitives,
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
  }) {
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
  }) {
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
  }) {
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
  }) {
    const field = this.builder
      .withBitloopsIdentifierType({ [bitloopsIdentifiersTypeKey]: identifier })
      .withName(name)
      .withOptional(isOptional)
      .build();
    return field;
  }
}
