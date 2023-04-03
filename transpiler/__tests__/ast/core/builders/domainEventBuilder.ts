import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { DomainEventIdentifierKey, TDomainEvent } from '../../../../src/types.js';

export class DomainEventBuilder implements IBuilder<TDomainEvent> {
  private identifierName: string;
  private entityIdentifier: string;

  public withIdentifier(identifierName: string): DomainEventBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withAggregateRootName(entityIdentifier: string): DomainEventBuilder {
    this.entityIdentifier = entityIdentifier;
    return this;
  }

  public build(): TDomainEvent {
    return {
      domainEvent: {
        [DomainEventIdentifierKey]: this.identifierName,
        entityIdentifier: this.entityIdentifier,
      },
    };
  }
}
