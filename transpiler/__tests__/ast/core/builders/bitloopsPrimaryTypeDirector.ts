import {
  arrayPrimaryTypeKey,
  bitloopsPrimaryTypeKey,
  bitloopsIdentifiersTypeKey,
  primitivesTypeKey,
  TBitloopsBuiltInClasses,
  TBitloopsIdentifier,
  TBitloopsPrimaryType,
  TBitloopsPrimitives,
} from '../../../../src/types.js';
import { BitloopsPrimaryTypeBuilder } from './bitloopsPrimaryType.js';

export class BitloopsPrimaryTypeDirector {
  private builder: BitloopsPrimaryTypeBuilder;

  constructor() {
    this.builder = new BitloopsPrimaryTypeBuilder();
  }

  buildDoubleArrayPrimaryType(type: TBitloopsPrimitives): TBitloopsPrimaryType {
    const primaryType = this.builder
      .withType({
        [bitloopsPrimaryTypeKey]: {
          [arrayPrimaryTypeKey]: { [arrayPrimaryTypeKey]: { [primitivesTypeKey]: type } },
        },
      })
      .build();
    return primaryType;
  }

  buildArrayPrimaryType(type: TBitloopsPrimitives): TBitloopsPrimaryType {
    const primaryType = this.builder
      .withType({
        [bitloopsPrimaryTypeKey]: { [arrayPrimaryTypeKey]: { [primitivesTypeKey]: type } },
      })
      .build();
    return primaryType;
  }

  buildArrayIdentifierPrimaryType(type: TBitloopsIdentifier): TBitloopsPrimaryType {
    const primaryType = this.builder
      .withType({
        [bitloopsPrimaryTypeKey]: { [arrayPrimaryTypeKey]: { [bitloopsIdentifiersTypeKey]: type } },
      })
      .build();
    return primaryType;
  }

  buildPrimitivePrimaryType(type: TBitloopsPrimitives): TBitloopsPrimaryType {
    const primaryType = this.builder
      .withType({ [bitloopsPrimaryTypeKey]: { [primitivesTypeKey]: type } })
      .build();
    return primaryType;
  }

  buildIdentifierPrimaryType(identifier: TBitloopsIdentifier): TBitloopsPrimaryType {
    const primaryType = this.builder
      .withType({ [bitloopsPrimaryTypeKey]: { [bitloopsIdentifiersTypeKey]: identifier } })
      .build();
    return primaryType;
  }

  buildBuiltinClassPrimaryType(type: TBitloopsBuiltInClasses): TBitloopsPrimaryType {
    const primaryType = this.builder
      .withType({ [bitloopsPrimaryTypeKey]: { buildInClassType: type } })
      .build();
    return primaryType;
  }
}
