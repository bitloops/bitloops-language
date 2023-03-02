import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import {
  TBitloopsPrimaryTypeValues,
  TDependencyInjection,
  TIntegrationEventHandler,
  bitloopsPrimaryTypeKey,
  expressionKey,
} from '../../../../types.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { ComponentSubscription } from './subscriptionComponent.js';

export class IntegrationEventHandlerSubscriptions extends ComponentSubscription<TIntegrationEventHandler> {
  getDIForComponentHandler(component: TIntegrationEventHandler): TDependencyInjection | undefined {
    return this.dependencyInjections.find(
      (di) =>
        di.dependencyInjection.identifier ===
        component.integrationEventHandler.integrationEventHandlerIdentifier,
    );
  }

  getComponentFromComponentHandler(handler: TIntegrationEventHandler): TBitloopsPrimaryTypeValues {
    return handler.integrationEventHandler.handle.parameter[bitloopsPrimaryTypeKey];
  }

  subscriptionStatement(
    busIdentifier: string,
    componentClassName: string,
    handler: string,
    integrationEventHandler: TIntegrationEventHandler,
  ): string {
    const version = integrationEventHandler.integrationEventHandler.evaluationField[expressionKey];
    const versionOutput = modelToTargetLanguage({
      value: { expression: version },
      type: BitloopsTypesMapping.TExpression,
    });

    return `await ${busIdentifier}.subscribe<${componentClassName}>(
        ${componentClassName}.getEventTopic(${versionOutput.output}),
        ${handler}.handle.bind(${handler}),
      );
      `;
  }
}
