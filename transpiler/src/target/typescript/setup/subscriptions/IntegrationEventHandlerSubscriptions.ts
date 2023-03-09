import {
  BitloopsTypesMapping,
  ClassTypes,
  TClassTypesValues,
} from '../../../../helpers/mappings.js';
import {
  TBitloopsPrimaryTypeValues,
  TDependencyInjection,
  TIntegrationEventHandler,
  expressionKey,
  bitloopsIdentifiersTypeKey,
} from '../../../../types.js';
import { modelToTargetLanguage } from '../../core/modelToTargetLanguage.js';
import { ComponentSubscription } from './subscriptionComponent.js';
import { TComponentSubscriptionDependency } from './subscriptionsHandler.js';

export class IntegrationEventHandlerSubscriptions extends ComponentSubscription<TIntegrationEventHandler> {
  componentHandlerNodeType = BitloopsTypesMapping.TIntegrationEventHandler;
  busIdentifier = 'integrationEventBus';
  busGetterFunction = 'Container.getIntegrationEventBus()';
  componentClassType = ClassTypes.IntegrationEvent;

  getDIForComponentHandler(component: TIntegrationEventHandler): TDependencyInjection | undefined {
    return this.dependencyInjections.find(
      (di) =>
        di.dependencyInjection.identifier ===
        component.integrationEventHandler.integrationEventHandlerIdentifier,
    );
  }

  getComponentFromComponentHandler(handler: TIntegrationEventHandler): TBitloopsPrimaryTypeValues {
    const { integrationEventIdentifier } =
      handler.integrationEventHandler.integrationEventHandlerHandleMethod.integrationEventParameter;
    const type: TBitloopsPrimaryTypeValues = {
      [bitloopsIdentifiersTypeKey]: integrationEventIdentifier,
    };
    return type;
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

  override generateComponentDependency(
    classType: TClassTypesValues,
    identifier: string,
    component: TIntegrationEventHandler,
  ): TComponentSubscriptionDependency {
    const { boundedContextModule } =
      component.integrationEventHandler.integrationEventHandlerHandleMethod
        .integrationEventParameter;
    return {
      type: classType,
      identifier,
      contextInfo: {
        boundedContext: boundedContextModule.boundedContextName.wordsWithSpaces,
        module: boundedContextModule.moduleName.wordsWithSpaces,
      },
    };
  }
}
