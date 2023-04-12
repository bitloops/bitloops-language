import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TDomainEventHandler,
  TEventHandlerBusDependencies,
  THandle,
  TOkErrorReturnType,
  TParameter,
  TParameterList,
  TStatements,
} from '../../../../../src/types.js';

export class DomainEventHandlerBuilder implements IBuilder<TDomainEventHandler> {
  private identifierName: string;
  private parameters: TParameterList;
  private handle: THandle;
  private busDependencies: TEventHandlerBusDependencies;

  public withIdentifier(identifierName: string): DomainEventHandlerBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withParameters(parameters: TParameterList): DomainEventHandlerBuilder {
    this.parameters = parameters;
    return this;
  }

  public withHandleMethod({
    statements,
    parameter,
    returnType,
  }: {
    statements: TStatements;
    parameter: TParameter;
    returnType: TOkErrorReturnType;
  }): DomainEventHandlerBuilder {
    this.handle = {
      statements,
      ...parameter,
      returnType: returnType.returnType,
    };
    return this;
  }

  public withDefaultBusDependencies(): DomainEventHandlerBuilder {
    this.busDependencies = {
      eventHandlerBusDependencies: {
        commandBus: true,
        integrationEventBus: true,
        queryBus: false,
        pubSubIntegrationEventBus: true,
      },
    };
    return this;
  }

  public withIntegrationEventBusDependency(): DomainEventHandlerBuilder {
    this.busDependencies = {
      eventHandlerBusDependencies: {
        commandBus: false,
        integrationEventBus: true,
        queryBus: false,
        pubSubIntegrationEventBus: false,
      },
    };
    return this;
  }

  public build(): TDomainEventHandler {
    const eventHandler: TDomainEventHandler = {
      domainEventHandler: {
        domainEventHandlerIdentifier: this.identifierName,
        handle: this.handle,
        ...this.parameters,
        ...this.busDependencies,
      },
    };

    return eventHandler;
  }
}
