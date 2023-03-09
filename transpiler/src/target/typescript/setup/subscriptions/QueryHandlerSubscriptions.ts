import { BitloopsTypesMapping, ClassTypes } from '../../../../helpers/mappings.js';
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
  componentHandlerNodeType = BitloopsTypesMapping.TQueryHandler;
  busIdentifier = 'queryBus';
  busGetterFunction = 'Container.getQueryBus()';
  componentClassType = ClassTypes.Query;

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
