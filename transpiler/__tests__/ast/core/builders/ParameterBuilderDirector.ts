import {
  TBitloopsIdentifier,
  TBitloopsPrimitives,
  TParameterDependency,
} from '../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from './bitloopsPrimaryTypeDirector.js';
import { ParameterBuilder } from './ParameterBuilder.js';

export class ParameterBuilderDirector {
  private builder: ParameterBuilder;

  constructor() {
    this.builder = new ParameterBuilder();
  }

  buildPrimitiveParameter(
    parameterName: string,
    primitiveType: TBitloopsPrimitives,
  ): TParameterDependency {
    return this.builder
      .withType(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType(primitiveType))
      .withValue(parameterName)
      .build();
  }

  buildIdentifierParameter(
    parameterName: string,
    identifierType: TBitloopsIdentifier,
  ): TParameterDependency {
    return this.builder
      .withType(new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(identifierType))
      .withValue(parameterName)
      .build();
  }
}
