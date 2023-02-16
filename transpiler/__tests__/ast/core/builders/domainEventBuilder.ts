import { IBuilder } from '../../../../src/ast/core/intermediate-ast/builders/IBuilder.js';
import { DomainEventIdentifierKey, TDomainEvent, TExpression } from '../../../../src/types.js';
import { TopicUtils } from '../../../../src/utils/topic.js';
import { ExpressionBuilderDirector } from './expressionDirector.js';

export class DomainEventBuilder implements IBuilder<TDomainEvent> {
  private identifierName: string;
  private entityIdentifier: string;
  constructor(private contextInfo: { boundedContextName: string; moduleName: string }) {}

  public withIdentifier(identifierName: string): DomainEventBuilder {
    this.identifierName = identifierName;
    return this;
  }

  public withAggregateRootName(entityIdentifier: string): DomainEventBuilder {
    this.entityIdentifier = entityIdentifier;
    return this;
  }

  private generateTopic(): TExpression {
    if (!this.identifierName) {
      throw new Error('Topic is not set');
    }
    const topic = TopicUtils.generateDefaultDomainEventTopicName(
      this.identifierName,
      this.contextInfo,
    );
    return new ExpressionBuilderDirector().buildStringLiteralExpression(topic);
  }

  public build(): TDomainEvent {
    return {
      domainEvent: {
        [DomainEventIdentifierKey]: this.identifierName,
        entityIdentifier: this.entityIdentifier,
        topic: this.generateTopic(),
      },
    };
  }
}
