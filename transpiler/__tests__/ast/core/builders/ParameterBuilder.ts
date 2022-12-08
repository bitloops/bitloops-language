import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TParamDependencyType,
  TParameterDependency,
  TParameterIdentifier,
} from '../../../../src/types.js';

export class ParameterBuilder implements IBuilder<TParameterDependency> {
  private type: TParamDependencyType;
  private value: TParameterIdentifier;

  public withType(type: TParamDependencyType): ParameterBuilder {
    this.type = type;
    return this;
  }

  public withValue(value: TParameterIdentifier): ParameterBuilder {
    this.value = value;
    return this;
  }

  public build(): TParameterDependency {
    const parameter = {
      parameter: {
        type: this.type,
        value: this.value,
      },
    };

    return parameter;
  }
}
