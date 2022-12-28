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
import { IEventBus as IEventBusImport } from './domain/events/IEventBus';
import { ICommandBus as ICommandBusImport } from './domain/commands/ICommandBus';
import { IMessageBus as IMessageBusImport } from './domain/messages/IMessageBus';
import { Container } from './Container';
import { IDomainIntegrationEvent as IDomainIntegrationEventImport } from './domain/events/IDomainIntegrationEvent';
import { IIntegrationEvent as IIntegrationEventImport } from './domain/events/IIntegrationEvent';
import { IntegrationEvent as IntegrationEventImport } from './domain/events/IntegrationEvent';
import { IDomainEvent as IDomainEventImport } from './domain/events/IDomainEvent';
import { fail as failWithPublish, ok as okWithpublish } from './ResultWithPublish';
import { Command as CommandImport } from './domain/commands/Command';
import {
  getIntegrationTopic as getIntegrationTopicImport,
  getProcessManagerTopic as getProcessManagerTopicImport,
  getTopic as getTopicImport,
} from './helpers';
import { dispatchEventsCallback as dispatchEventsCallbackImport } from './domain/events/dispatchEventsCallback';
import { IHandle as IHanldeImport } from './application/IHandle';

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
  export type IDomainIntegrationEvent = IDomainIntegrationEventImport;
  export type IIntegrationEvent = IIntegrationEventImport;
  export class IntegrationEvent<T> extends IntegrationEventImport<T> {}
  export type IDomainEvent = IDomainEventImport;
  export class Command extends CommandImport {}
  export const dispatchEventsCallback = dispatchEventsCallbackImport;
}

namespace Application {
  export class Error extends AppError {}
  export type IUseCase<IRequest, IResponse> = UseCase<IRequest, IResponse>;
  export type IHandle = IHanldeImport;

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
  export namespace Messaging {
    export class EventBus extends EventBusImport {}
    export class InProcessMessageBus extends InProcessMessageBusImport {}
  }
}

namespace MessageBus {
  export type IEventBus = IEventBusImport;
  export type ICommandBus = ICommandBusImport;
  export type IMessageBus = IMessageBusImport;
  export const getIntegrationTopic = getIntegrationTopicImport;
  export const getProcessManagerTopic = getProcessManagerTopicImport;
  export const getTopic = getTopicImport;
}

export {
  Application,
  Domain,
  Either,
  Infra,
  fail,
  ok,
  MessageBus,
  Container,
  failWithPublish,
  okWithpublish,
};
