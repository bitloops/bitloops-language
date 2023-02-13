import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TDomainEventHandler,
  TEventHandlerBusDependencies,
  THandle,
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
  }: {
    statements: TStatements;
    parameter: TParameter;
  }): DomainEventHandlerBuilder {
    this.handle = {
      statements,
      ...parameter,
    };
    return this;
  }

  public withDefaultBusDependencies(): DomainEventHandlerBuilder {
    this.busDependencies = {
      commandBus: true,
      integrationEventBus: false,
      queryBus: false,
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
