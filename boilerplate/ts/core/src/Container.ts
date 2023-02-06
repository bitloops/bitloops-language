import { ApplicationConfig, CONTEXT_TYPES } from './config';
import { ICommandBus } from './domain/commands/ICommandBus';
import { DomainEvents } from './domain/events/DomainEvents';
import { IEventBus } from './domain/events/IEventBus';
import { IMessageBus } from './domain/messages/IMessageBus';
import { CommandBus } from './infra/command-bus';
import { ExternalCommandBus } from './infra/command-bus/externalCommandBus';
import { ExternalQueryBus } from './infra/query-bus/externalQueryBus';
import { EventBus } from './infra/event-bus';
import {
  ExternalMessageBusFactory,
  ExternalMessageBusProviders,
} from './infra/message-bus/ExternalMessageBusFactory';
import { InProcessMessageBus } from './infra/message-bus/InProcessMessageBus';
import { IQueryBus } from './domain/queries/IQueryBus';
import { QueryBus } from './infra/query-bus/QueryBus';

interface IServices {
  inProcessCommandBus: ICommandBus;
  externalCommandBus: ICommandBus;
  inProcessQueryBus: IQueryBus;
  externalQueryBus: IQueryBus;
  inProcessEventBus: IEventBus;
  externalEventBus: IEventBus;
  inProcessMessageBus: IMessageBus;
  externalMessageBus: IMessageBus;
  events: DomainEvents;
}

export class Container {
  private static services: IServices;

  private static inProcessMessageBus: IMessageBus;
  private static externalMessageBus: IMessageBus;

  private static inProcessCommandBus: ICommandBus;
  // External means not in process command bus
  private static externalCommandBus: ICommandBus;

  private static inProcessQueryBus: IQueryBus;
  private static externalQueryBus: IQueryBus;

  private static inProcessEventBus: IEventBus;
  private static externalEventBus: IEventBus;

  private static events: DomainEvents;
  private static appConfig: ApplicationConfig;

  static async initializeServices(appConfig: ApplicationConfig): Promise<IServices> {
    Container.appConfig = appConfig;
    Container.inProcessMessageBus = new InProcessMessageBus();
    Container.externalMessageBus = await ExternalMessageBusFactory(
      ExternalMessageBusProviders.NATS,
    );

    Container.inProcessCommandBus = new CommandBus(Container.inProcessMessageBus);
    Container.externalCommandBus = new ExternalCommandBus(Container.externalMessageBus);

    Container.inProcessQueryBus = new QueryBus(Container.inProcessMessageBus);
    Container.externalQueryBus = new ExternalQueryBus(Container.externalMessageBus);

    Container.inProcessEventBus = new EventBus(Container.inProcessMessageBus);
    Container.externalEventBus = new EventBus(Container.externalMessageBus);

    Container.events = new DomainEvents(Container.inProcessEventBus);

    const services = {
      externalCommandBus: Container.externalCommandBus,
      inProcessCommandBus: Container.inProcessCommandBus,
      inProcessQueryBus: Container.inProcessQueryBus,
      externalQueryBus: Container.externalQueryBus,
      inProcessEventBus: Container.inProcessEventBus,
      externalEventBus: Container.externalEventBus,
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

  static getQueryBusFromContext(contextId: string): IQueryBus {
    let queryBus: IQueryBus;
    if (!Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId]) {
      throw new Error(`Context id: ${contextId} is missing from mappings`);
    }
    if (Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].QUERY_BUS === CONTEXT_TYPES.InProcess) {
      queryBus = Container.inProcessQueryBus;
    } else if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].QUERY_BUS === CONTEXT_TYPES.External
    ) {
      queryBus = Container.externalQueryBus;
    } else {
      // default
      queryBus = Container.inProcessQueryBus;
    }
    return queryBus;
  }

  static getMessageBusFromContext(contextId: string): IMessageBus {
    let messageBus: IMessageBus;
    if (!Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId]) {
      throw new Error(`Context id: ${contextId} is missing from mappings`);
    }
    if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].COMMAND_BUS === CONTEXT_TYPES.InProcess
    ) {
      messageBus = Container.inProcessMessageBus;
    } else if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].COMMAND_BUS === CONTEXT_TYPES.External
    ) {
      messageBus = Container.externalMessageBus;
    } else {
      // default
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
    } else {
      eventBus = Container.inProcessEventBus;
    }

    return eventBus;
  }

  static getIntegrationEventBusFromContext(contextId: string): IEventBus {
    let eventBus: IEventBus;
    if (!Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId]) {
      throw new Error(`Context id: ${contextId} is missing from mappings`);
    }
    if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].INTEGRATION_EVENT_BUS ===
      CONTEXT_TYPES.InProcess
    ) {
      eventBus = Container.inProcessEventBus;
    } else if (
      Container.appConfig.CONTEXT_IDs_MAPPINGS[contextId].INTEGRATION_EVENT_BUS ===
      CONTEXT_TYPES.External
    ) {
      eventBus = Container.externalEventBus;
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
