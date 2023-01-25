import 'reflect-metadata';
import { AppError } from './application/AppError';
import { UseCase } from './application/UseCase';
import { RepoError } from './application/RepoError';
import { CRUDReadRepoPort, CRUDRepoPort, CRUDWriteRepoPort } from './application/ICRUDRepoPort';
import { DomainError } from './domain/DomainError';
import { Either, fail, ok } from './Either';
import { AggregateRoot } from './domain/AggregateRoot';
import { Entity as EntityImport } from './domain/Entity';
import {
  IBaseController as IBaseControllerImport,
  ErrorMessage as ErrorMessageImport,
} from './application/rest/IBaseController';
import { IMQ as IMQImport } from './application/mq/IMQ';
import { IRule as IRuleImport } from './domain/IRule';
import { applyRules as applyRulesImport } from './domain/applyRule';
import { UUIDv4 as UUIDv4Import } from './domain/UUIDv4';
import { ValueObject as ValueObjectImport, ValueObjectProps } from './domain/ValueObject';
import { ReadModel as ReadModelImport } from './domain/ReadModel';
import { EventBus as EventBusImport } from './infra/event-bus';
import { InProcessMessageBus as InProcessMessageBusImport } from './infra/message-bus/InProcessMessageBus';
import { DomainEvent } from './domain/events/DomainEvent';
import { IntegrationEvent as IntegrationEventImport } from './domain/events/IntegrationEvent';
import { IEventBus as IEventBusImport } from './domain/events/IEventBus';
import { ICommandBus as ICommandBusImport } from './domain/commands/ICommandBus';
import { IMessageBus as IMessageBusImport } from './domain/messages/IMessageBus';
import { Container } from './Container';
import { IDomainEvent as IDomainEventImport } from './domain/events/IDomainEvent';
import { fail as failWithPublish, ok as okWithpublish } from './ResultWithPublish';
import { Command as CommandImport } from './domain/commands/Command';
import {
  getIntegrationTopic as getIntegrationTopicImport,
  getProcessManagerTopic as getProcessManagerTopicImport,
  getTopic as getTopicImport,
} from './helpers';
import { dispatchEventsCallback as dispatchEventsCallbackImport } from './domain/events/dispatchEventsCallback';
import { IHandle as IHandleImport } from './application/IHandle';
import { ApplicationConfig as ApplicationConfigImport } from './config';
import { CommandBus as CommandBusImport } from './infra/command-bus/';

namespace Domain {
  export class Error extends DomainError {}
  export class Aggregate<T> extends AggregateRoot<T> {}
  export class Entity<T> extends EntityImport<T> {}
  export class ValueObject<T extends ValueObjectProps> extends ValueObjectImport<T> {}
  export class ReadModel<T> extends ReadModelImport<T> {}
  export class UUIDv4 extends UUIDv4Import {}
  export type IRule = IRuleImport;
  export const applyRules = applyRulesImport;
  export class Event extends DomainEvent {}
  export type IDomainEvent = IDomainEventImport;
  export class Command extends CommandImport {}
  export const dispatchEventsCallback = dispatchEventsCallbackImport;
}

namespace Application {
  export class Error extends AppError {}
  export type IUseCase<IRequest, IResponse> = UseCase<IRequest, IResponse>;
  export type IHandle = IHandleImport;

  export namespace Repo {
    export class Error extends RepoError {}
    export type ICRUDPort<Aggregate, AggregateId> = CRUDRepoPort<Aggregate, AggregateId>;
    export type ICRUDReadPort<ReadModel> = CRUDReadRepoPort<ReadModel>;
    export type ICRUDWritePort<Aggregate, AggregateId> = CRUDWriteRepoPort<Aggregate, AggregateId>;
  }
  export namespace REST {
    export type IBaseController<Req, Res> = IBaseControllerImport<Req, Res>;
    export type ErrorMessage = ErrorMessageImport;
  }
  export namespace MQ {
    export type IMQ<Connection> = IMQImport<Connection>;
  }
}

namespace Infra {
  export namespace EventBus {
    export class IntegrationEvent extends IntegrationEventImport {}
    export class EventBus extends EventBusImport {}
    export type IEventBus = IEventBusImport;
  }
  export namespace CommandBus {
    export class CommandBus extends CommandBusImport {}
    export type ICommandBus = ICommandBusImport;
  }

  export namespace MessageBus {
    export type IMessageBus = IMessageBusImport;
    export class InProcessMessageBus extends InProcessMessageBusImport {}

    //TODO maybe delete
    export const getIntegrationTopic = getIntegrationTopicImport;
    export const getProcessManagerTopic = getProcessManagerTopicImport;
    export const getTopic = getTopicImport;
  }
}

//TODO  SOS!!!! this is a duplicate - find a way to export original enum
namespace Constants {
  export enum TOPIC_PREFIXES {
    Event = 'event',
    Command = 'command',
    Query = 'query',
  }
  export enum CONTEXT_TYPES {
    InProcess = 'InProcess',
    External = 'External',
  }
  export enum MESSAGE_BUS {
    EVENT_BUS = 'EVENT_BUS',
    COMMAND_BUS = 'COMMAND_BUS',
    INTEGRATION_EVENT_BUS = 'INTEGRATION_EVENT_BUS',
  }
  export type ApplicationConfig = ApplicationConfigImport;
}

export {
  Application,
  Domain,
  Either,
  Infra,
  fail,
  ok,
  Container,
  failWithPublish,
  okWithpublish,
  Constants,
};
