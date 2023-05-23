import { TBitloopsIdentifier, TBitloopsPrimitives, TParameter } from '../../../../src/types.js';
import { BitloopsPrimaryTypeDirector } from './bitloopsPrimaryTypeDirector.js';
import { ParameterBuilder } from './ParameterBuilder.js';

export class ParameterBuilderDirector {
  private builder: ParameterBuilder;

  constructor() {
    this.builder = new ParameterBuilder();
  }

  buildPrimitiveParameter(parameterName: string, primitiveType: TBitloopsPrimitives): TParameter {
    return this.builder
      .withType(new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType(primitiveType))
      .withValue(parameterName)
      .build();
  }

  buildIdentifierParameter(parameterName: string, identifierType: TBitloopsIdentifier): TParameter {
    return this.builder
      .withType(new BitloopsPrimaryTypeDirector().buildIdentifierPrimaryType(identifierType))
      .withValue(parameterName)
      .build();
  }

  buildParameterWithoutType(parameterName: string): TParameter {
    return this.builder.withValue(parameterName).build();
  }
}
