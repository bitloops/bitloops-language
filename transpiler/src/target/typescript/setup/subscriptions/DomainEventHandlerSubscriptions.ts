import { BitloopsTypesMapping, ClassTypes } from '../../../../helpers/mappings.js';
import {
  TBitloopsPrimaryTypeValues,
  TDependencyInjection,
  TDomainEventHandler,
  bitloopsPrimaryTypeKey,
} from '../../../../types.js';
import { ComponentSubscription } from './subscriptionComponent.js';

export class DomainEventHandlerSubscriptions extends ComponentSubscription<TDomainEventHandler> {
  componentHandlerNodeType = BitloopsTypesMapping.TDomainEventHandler;
  busIdentifier = 'domainEventBus';
  busGetterFunction = 'Container.getEventBus()';
  componentClassType = ClassTypes.DomainEvent;

  getDIForComponentHandler(component: TDomainEventHandler): TDependencyInjection | undefined {
    return this.dependencyInjections.find(
      (di) =>
        di.dependencyInjection.identifier ===
        component.domainEventHandler.domainEventHandlerIdentifier,
    );
  }

  getComponentFromComponentHandler(handler: TDomainEventHandler): TBitloopsPrimaryTypeValues {
    return handler.domainEventHandler.handle.parameter[bitloopsPrimaryTypeKey];
  }

  subscriptionStatement(
    busIdentifier: string,
    componentClassName: string,
    handler: string,
  ): string {
    return `await ${busIdentifier}.subscribe<${componentClassName}>(
        ${componentClassName}.getEventTopic(),
        ${handler}.handle.bind(${handler}),
      );`;
  }
}