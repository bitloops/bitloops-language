import {
  TBitloopsPrimaryTypeValues,
  TDependencyInjection,
  TQueryHandler,
  bitloopsPrimaryTypeKey,
  identifierKey,
  queryHandlerKey,
} from '../../../../types.js';
import { ComponentSubscription } from './subscriptionComponent.js';

export class QueryHandlerSubscriptions extends ComponentSubscription<TQueryHandler> {
  getDIForComponentHandler(component: TQueryHandler): TDependencyInjection | undefined {
    return this.dependencyInjections.find(
      (di) => di.dependencyInjection.identifier === component[queryHandlerKey][identifierKey],
    );
  }

  getComponentFromComponentHandler(handler): TBitloopsPrimaryTypeValues {
    return handler[queryHandlerKey].execute.parameter[bitloopsPrimaryTypeKey];
  }

  subscriptionStatement(
    busIdentifier: string,
    componentClassName: string,
    handler: string,
  ): string {
    return `await ${busIdentifier}.register(
        ${componentClassName}.getQueryTopic(),
        ${handler}.execute.bind(${handler}),
      );
    `;
  }
}
