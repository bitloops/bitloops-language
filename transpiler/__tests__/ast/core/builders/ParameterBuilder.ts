import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TParameterType,
  TParameter,
  TParameterIdentifier,
  bitloopsPrimaryTypeKey,
} from '../../../../src/types.js';

export class ParameterBuilder implements IBuilder<TParameter> {
  private type?: TParameterType;
  private value: TParameterIdentifier;

  public withType(type: TParameterType): ParameterBuilder {
    this.type = type;
    return this;
  }

  public withValue(value: TParameterIdentifier): ParameterBuilder {
    this.value = value;
    return this;
  }

  public build(): TParameter {
    const parameter: TParameter = {
      parameter: {
        value: this.value,
      },
    };

    if (this.type) {
      parameter.parameter.type = this.type[bitloopsPrimaryTypeKey];
    }

    return parameter;
  }
}
