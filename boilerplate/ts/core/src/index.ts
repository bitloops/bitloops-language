import 'reflect-metadata';
import { AppError } from './application/AppError';
import { CRUDReadRepoPort, CRUDRepoPort, CRUDWriteRepoPort } from './application/ICRUDRepoPort';
import { IMQ as IMQImport } from './application/mq/IMQ';
import { UseCase } from './application/UseCase';
import { AggregateRoot } from './domain/AggregateRoot';
import { applyRules as applyRulesImport } from './domain/applyRule';
import { ICommandBus as ICommandBusImport } from './domain/commands/ICommandBus';
import { DomainError } from './domain/DomainError';
import { Entity as EntityImport } from './domain/Entity';
import { DomainEvent } from './domain/events/DomainEvent';
import { IEventBus as IEventBusImport } from './domain/events/IEventBus';
import { IntegrationEvent as IntegrationEventImport } from './domain/events/IntegrationEvent';
import { IRule as IRuleImport } from './domain/IRule';
import { IMessageBus as IMessageBusImport } from './domain/messages/IMessageBus';
import { ReadModel as ReadModelImport } from './domain/ReadModel';
import { UUIDv4 as UUIDv4Import } from './domain/UUIDv4';
import { ValueObject as ValueObjectImport, ValueObjectProps } from './domain/ValueObject';
import { Either, fail, ok } from './Either';
import { EventBus as EventBusImport } from './infra/event-bus';
import { IBaseGraphQLController as IBaseGraphQLControllerImport } from './infra/graphql/IBaseGraphQLController';
import { InProcessMessageBus as InProcessMessageBusImport } from './infra/message-bus/InProcessMessageBus';
import {
  ErrorMessage as ErrorMessageImport,
  IBaseRESTController as IBaseControllerImport,
} from './infra/rest/IBaseRESTController';

import { Container } from './Container';
import { Command as CommandImport } from './domain/commands/Command';
import { IDomainEvent as IDomainEventImport } from './domain/events/IDomainEvent';
import { Query as QueryImport } from './domain/queries/Query';
import { RespondWithPublish } from './ResultWithPublish';

import { IHandle as IHandleImport } from './application/IHandle';
import {
  ApplicationConfig as ApplicationConfigImport,
  CONTEXT_TYPES as CONTEXT_TYPES_IMPORT,
  MESSAGE_BUS as MESSAGE_BUS_IMPORT,
  TOPIC_PREFIXES as TOPIC_PREFIXES_IMPORT,
} from './config';
import { dispatchEventsCallback as dispatchEventsCallbackImport } from './domain/events/dispatchEventsCallback';
import { IQueryBus as IQueryBusImport } from './domain/queries/IQueryBus';
import { NotFoundError } from './errors/repository/NotFoundError';
import { ConcurrencyError } from './errors/repository/ConcurrencyError';
import { CommandBus as CommandBusImport } from './infra/command-bus/';
import { QueryBus as QueryBusImport } from './infra/query-bus/QueryBus';
import {
  CurrencyVO as CurrencyVOImport,
  ErrorTypes as CurrencyVOErrorTypesImport,
} from './domain/standard-values';

namespace Domain {
  export class Error extends DomainError {}
  export class Aggregate<T> extends AggregateRoot<T> {}
  export class Entity<T> extends EntityImport<T> {}
  export class ValueObject<T extends ValueObjectProps> extends ValueObjectImport<T> {}
  export class ReadModel<T> extends ReadModelImport<T> {}
  export class UUIDv4 extends UUIDv4Import {}
  export type IRule = IRuleImport;
  export const applyRules = applyRulesImport;
  export class Event<T> extends DomainEvent<T> {}
  export type IDomainEvent = IDomainEventImport;
  export const dispatchEventsCallback = dispatchEventsCallbackImport;
  export namespace StandardVO {
    export namespace Currency {
      export class Value extends CurrencyVOImport {}
      export type ErrorTypes = CurrencyVOErrorTypesImport;
    }
  }
}

namespace Application {
  export class Error extends AppError {}
  export type IUseCase<IRequest, IResponse> = UseCase<IRequest, IResponse>;
  export type IHandle = IHandleImport;
  export class Command extends CommandImport {}
  export class Query extends QueryImport {}

  export namespace Repo {
    export namespace Errors {
      export class NotFound extends NotFoundError {}
      export class Concurrency extends ConcurrencyError {}
    }
    export type ICRUDPort<Aggregate, AggregateId> = CRUDRepoPort<Aggregate, AggregateId>;
    export type ICRUDReadPort<ReadModel> = CRUDReadRepoPort<ReadModel>;
    export type ICRUDWritePort<Aggregate, AggregateId> = CRUDWriteRepoPort<Aggregate, AggregateId>;
  }
}

namespace Infra {
  export namespace REST {
    export type IBaseController<Req, Res> = IBaseControllerImport<Req, Res>;
    export type ErrorMessage = ErrorMessageImport;
  }

  export namespace GraphQL {
    export type IBaseController<TRequest, TResponseData> = IBaseGraphQLControllerImport<
      TRequest,
      TResponseData
    >;
  }

  export namespace EventBus {
    export class IntegrationEvent<T> extends IntegrationEventImport<T> {}
    export class EventBus extends EventBusImport {}
    export type IEventBus = IEventBusImport;
  }
  export namespace CommandBus {
    export class CommandBus extends CommandBusImport {}
    export type ICommandBus = ICommandBusImport;
  }

  export namespace QueryBus {
    export class QueryBus extends QueryBusImport {}
    export type IQueryBus = IQueryBusImport;
  }

  export namespace MessageBus {
    export type IMessageBus = IMessageBusImport;
    export class InProcessMessageBus extends InProcessMessageBusImport {}
  }

  export namespace MQ {
    export type IMQ<Connection> = IMQImport<Connection>;
  }
}

namespace Constants {
  export const TOPIC_PREFIXES = TOPIC_PREFIXES_IMPORT;
  export const CONTEXT_TYPES = CONTEXT_TYPES_IMPORT;
  export const MESSAGE_BUS = MESSAGE_BUS_IMPORT;
  export type ApplicationConfig = ApplicationConfigImport;
}

export { Application, Domain, Either, Infra, fail, ok, Container, RespondWithPublish, Constants };
