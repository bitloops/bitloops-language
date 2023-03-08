import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TBusType,
  TConfigBusesInvocation,
  configBusesInvocationKey,
} from '../../../../src/types.js';

export class ConfigBusesInvocationBuilder implements IBuilder<TConfigBusesInvocation> {
  private commandBus: TBusType;
  private eventBus: TBusType;
  private queryBus: TBusType;
  private integrationEventBus: TBusType;

  public withCommandBus(commandBus: TBusType): ConfigBusesInvocationBuilder {
    this.commandBus = commandBus;
    return this;
  }

  public withEventBus(eventBus: TBusType): ConfigBusesInvocationBuilder {
    this.eventBus = eventBus;
    return this;
  }

  public withQueryBus(queryBus: TBusType): ConfigBusesInvocationBuilder {
    this.queryBus = queryBus;
    return this;
  }

  public withIntegrationEventBus(integrationEventBus: TBusType): ConfigBusesInvocationBuilder {
    this.integrationEventBus = integrationEventBus;
    return this;
  }

  public build(): TConfigBusesInvocation {
    const configInvocation: TConfigBusesInvocation = {
      [configBusesInvocationKey]: {
        commandBus: this.commandBus,
        eventBus: this.eventBus,
        queryBus: this.queryBus,
        integrationEventBus: this.integrationEventBus,
      },
    };
    return configInvocation;
  }
}
