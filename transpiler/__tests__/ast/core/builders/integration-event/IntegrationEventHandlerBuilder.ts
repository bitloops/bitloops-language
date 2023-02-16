import { IBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import {
  TEvaluationField,
  TEventHandlerBusDependencies,
  THandle,
  TIntegrationEventHandler,
  TParameter,
  TParameterList,
  TStatements,
} from '../../../../../src/types.js';

export class IntegrationEventHandlerBuilder implements IBuilder<TIntegrationEventHandler> {
  private identifierName: string;
  private parameters: TParameterList;
  private handle: THandle;
  private evaluationField: TEvaluationField;
  private busDependencies: TEventHandlerBusDependencies;

  public withIdentifier(identifierName: string): IntegrationEventHandlerBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withParameters(parameters: TParameterList): IntegrationEventHandlerBuilder {
    this.parameters = parameters;
    return this;
  }

  public withEventVersion(evaluationField: TEvaluationField): IntegrationEventHandlerBuilder {
    this.evaluationField = evaluationField;
    return this;
  }

  public withHandleMethod({
    statements,
    parameter,
  }: {
    statements: TStatements;
    parameter: TParameter;
  }): IntegrationEventHandlerBuilder {
    this.handle = {
      statements,
      ...parameter,
    };
    return this;
  }

  public withDefaultBusDependencies(): IntegrationEventHandlerBuilder {
    this.busDependencies = {
      eventHandlerBusDependencies: {
        commandBus: true,
        integrationEventBus: false,
        queryBus: false,
      },
    };
    return this;
  }

  public build(): TIntegrationEventHandler {
    const eventHandler: TIntegrationEventHandler = {
      integrationEventHandler: {
        integrationEventHandlerIdentifier: this.identifierName,
        handle: this.handle,
        ...this.parameters,
        ...this.busDependencies,
        ...this.evaluationField,
      },
    };

    return eventHandler;
  }
}
