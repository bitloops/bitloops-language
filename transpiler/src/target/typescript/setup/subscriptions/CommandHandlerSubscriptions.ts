import {
  TBitloopsPrimaryTypeValues,
  TCommandHandler,
  TDependencyInjection,
  bitloopsPrimaryTypeKey,
  commandHandlerKey,
  identifierKey,
} from '../../../../types.js';
import { ComponentSubscription } from './subscriptionComponent.js';

export class CommandHandlerSubscriptions extends ComponentSubscription<TCommandHandler> {
  getDIForComponentHandler(component): TDependencyInjection | undefined {
    return this.dependencyInjections.find(
      (di) => di.dependencyInjection.identifier === component[commandHandlerKey][identifierKey],
    );
  }

  getComponentFromComponentHandler(handler): TBitloopsPrimaryTypeValues {
    return handler[commandHandlerKey].execute.parameter[bitloopsPrimaryTypeKey];
  }

  subscriptionStatement(
    busIdentifier: string,
    componentClassName: string,
    handler: string,
  ): string {
    return `await ${busIdentifier}.register(
        ${componentClassName}.getCommandTopic(),
        ${handler}.execute.bind(${handler}),
      );
      `;
  }
}
