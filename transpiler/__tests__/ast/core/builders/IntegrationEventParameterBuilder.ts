import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TParameterIdentifier,
  TIntegrationEventParameter,
  TIntegrationEventIdentifier,
  TBoundedContextModule,
} from '../../../../src/types.js';

export class IntegrationEventParameterBuilder implements IBuilder<TIntegrationEventParameter> {
  private type: TIntegrationEventIdentifier;
  private value: TParameterIdentifier;
  private bcModule: TBoundedContextModule;

  public withIntegrationTypeIdentifier(
    type: TIntegrationEventIdentifier,
  ): IntegrationEventParameterBuilder {
    this.type = type;
    return this;
  }

  public withValue(value: TParameterIdentifier): IntegrationEventParameterBuilder {
    this.value = value;
    return this;
  }

  public withBoundedContextModule(
    bcModule: TBoundedContextModule,
  ): IntegrationEventParameterBuilder {
    this.bcModule = bcModule;
    return this;
  }

  public build(): TIntegrationEventParameter {
    const parameter = {
      integrationEventParameter: {
        integrationEventIdentifier: this.type,
        value: this.value,
        ...this.bcModule,
      },
    };

    return parameter;
  }
}
