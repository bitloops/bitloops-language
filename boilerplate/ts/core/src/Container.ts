import { ApplicationConfig, CONTEXT_TYPES } from './config';
import { ICommandBus } from './domain/commands/ICommandBus';
import { Events } from './domain/events/Events';
import { IEventBus } from './domain/events/IEventBus';
import { IMessageBus } from './domain/messages/IMessageBus';
import { CommandBus } from './infra/command-bus';
import { EventBus } from './infra/event-bus';
import { ExternalEventBusDecorator } from './infra/event-bus/EventBusDecorator';
import {
  ExternalMessageBusFactory,
  ExternalMessageBusProviders,
} from './infra/message-bus/ExternalMessageBusFactory';
import { InProcessMessageBus } from './infra/message-bus/InProcessMessageBus';

interface IServices {
  commandBus: ICommandBus;
  inProcessEventBus: IEventBus;
  externalEventBus: IEventBus;
  decoratedEventBus: IEventBus;
  externalInProcessEventBus: IEventBus;
  inProcessMessageBus: IMessageBus;
  externalMessageBus: IMessageBus;
  events: Events;
}

export class Container {
  private static services: IServices;

  private static inProcessMessageBus: IMessageBus;
  private static externalMessageBus: IMessageBus;

  private static commandBus: ICommandBus;
  private static inProcessCommandBus: ICommandBus;
  private static externalCommandBus: ICommandBus;

  private static inProcessEventBus: IEventBus;
  private static externalEventBus: IEventBus;
  private static decoratedEventBus: IEventBus;

  private static externalInProcessEventBus: IEventBus;
  private static events: Events;
  private static appConfig: ApplicationConfig;

  static async initializeServices(appConfig: ApplicationConfig): Promise<IServices> {
    Container.appConfig = appConfig;
    Container.inProcessMessageBus = new InProcessMessageBus();
    Container.externalMessageBus = await ExternalMessageBusFactory(
      ExternalMessageBusProviders.NATS,
    );

    Container.inProcessCommandBus = new CommandBus(Container.inProcessMessageBus);
    Container.externalCommandBus = new CommandBus(Container.externalMessageBus);
    Container.commandBus = Container.inProcessCommandBus;

    Container.inProcessEventBus = new EventBus(Container.inProcessMessageBus);
    Container.externalEventBus = new EventBus(Container.externalMessageBus);
    Container.decoratedEventBus = new ExternalEventBusDecorator(
      Container.inProcessEventBus,
      Container.externalEventBus,
    );

    Container.externalInProcessEventBus = new ExternalEventBusDecorator(
      Container.inProcessEventBus,
      Container.externalEventBus,
    );

    Container.events = new Events(Container.inProcessEventBus, Container.inProcessEventBus);

    const services = {
      commandBus: Container.commandBus,
      inProcessEventBus: Container.inProcessEventBus,
      externalEventBus: Container.externalEventBus,
      decoratedEventBus: Container.decoratedEventBus,
      externalInProcessEventBus: Container.externalInProcessEventBus,
      externalMessageBus: Container.externalMessageBus,
      inProcessMessageBus: Container.inProcessMessageBus,
      events: Container.events,
    };
    Container.services = services;
    return services;
  }

  static getCommandBusFromContext(contextId: string): ICommandBus {
    let commandBus: ICommandBus;
    if (!Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId]) {
      throw new Error(`Context id: ${contextId} is missing from mappings`);
    }
    if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].COMMAND_BUS === CONTEXT_TYPES.InProcess
    ) {
      commandBus = Container.inProcessCommandBus;
    } else if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].COMMAND_BUS === CONTEXT_TYPES.External
    ) {
      commandBus = Container.externalCommandBus;
    } else {
      // default
      commandBus = Container.inProcessCommandBus;
    }
    return commandBus;
  }

  static getMessageBusFromContext(contextId: string): IMessageBus {
    let messageBus: IMessageBus;
    if (!Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId]) {
      throw new Error(`Context id: ${contextId} is missing from mappings`);
    }
    if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].MESSAGE_BUS === CONTEXT_TYPES.InProcess
    ) {
      messageBus = Container.inProcessMessageBus;
    } else if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].MESSAGE_BUS === CONTEXT_TYPES.External
    ) {
      messageBus = Container.externalMessageBus;
    } else {
      messageBus = Container.inProcessMessageBus;
    }

    return messageBus;
  }

  static getEventBusFromContext(contextId: string): IEventBus {
    let eventBus: IEventBus;
    if (!Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId]) {
      throw new Error(`Context id: ${contextId} is missing from mappings`);
    }
    if (Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].EVENT_BUS === CONTEXT_TYPES.InProcess) {
      eventBus = Container.inProcessEventBus;
    } else if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].EVENT_BUS === CONTEXT_TYPES.External
    ) {
      eventBus = Container.externalEventBus;
    } else if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].EVENT_BUS === CONTEXT_TYPES.Hybrid
    ) {
      eventBus = Container.decoratedEventBus;
    } else {
      eventBus = Container.inProcessEventBus;
    }

    return eventBus;
  }

  static getServices(): IServices {
    return Container.services;
  }

  // static getConfig(): Config {
  //   return Container.config;
  // }
}
