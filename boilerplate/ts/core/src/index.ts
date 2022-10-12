import { AppError } from './application/AppError';
import { UseCase } from './application/UseCase';
import { RepoError } from './application/RepoError';
import { CRUDRepoPort } from './application/ICRUDRepoPort';
import { DomainError } from './domain/DomainError';
import { Either, fail, ok } from './Either';
import { AggregateRoot } from './domain/AggregateRoot';
import { Entity as EntityImport } from './domain/Entity';
import { IBaseController as IBaseControllerImport } from './infra/rest/IBaseController';
import { IMQ as IMQImport } from './infra/mq/IMQ';
import { IBusinessRule as IBusinessRuleImport } from './domain/IBusinessRule';
import { UniqueEntityID as UniqueEntityIDImport } from './domain/UniqueEntityID';
import { ValueObject as ValueObjectImport, ValueObjectProps } from './domain/ValueObject';
import { ReadModel as ReadModelImport } from './domain/ReadModel';
import { EventBus as EventBusImport } from './infra/event-bus';
import { InProcessMessageBus as InProcessMessageBusImport } from './infra/message-bus/InProcessMessageBus';

namespace Domain {
  export class Error extends DomainError {}
  export class Aggregate<T> extends AggregateRoot<T> {}
  export class Entity<T> extends EntityImport<T> {}
  export class ValueObject<T extends ValueObjectProps> extends ValueObjectImport<T> {}
  export class ReadModel<T> extends ReadModelImport<T> {}
  export class UniqueEntityID extends UniqueEntityIDImport {}
  export type IBusinessRule = IBusinessRuleImport;
}

namespace Application {
  export class Error extends AppError {}
  export type IUseCase<IRequest, IResponse> = UseCase<IRequest, IResponse>;

  export namespace Repo {
    export class Error extends RepoError {}
    export type ICRUDPort<Aggregate, AggregateId> = CRUDRepoPort<Aggregate, AggregateId>;
  }
  export namespace REST {
    export type IBaseController<Req, Res> = IBaseControllerImport<Req, Res>;
  }
  export namespace MQ {
    export type IMQ<Connection> = IMQImport<Connection>;
  }
  export namespace Messaging {
    export class EventBus extends EventBusImport {}
    export class InProcessMessageBus extends InProcessMessageBusImport {}
  }
}

export { Application, Domain, Either, fail, ok };
