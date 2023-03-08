import { TopicUtils } from '../../../../../utils/topic.js';
import { ExpressionBuilderDirector } from '../../directors/ExpressionDirector.js';
import { DomainEventTopicNode } from '../../nodes/DomainEvent/DomainEventTopicNode.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainEventTopicNodeBuilder implements IBuilder<DomainEventTopicNode> {
  private topicNode: DomainEventTopicNode;
  private expression: ExpressionNode;
  constructor() {
    this.topicNode = new DomainEventTopicNode();
  }
  withExpression(expression: ExpressionNode): DomainEventTopicNodeBuilder {
    this.expression = expression;
    return this;
  }

  // convert camelCase to snake_case and remove the 'DomainEvent' suffix and upper case all letters
  public generateTopicName(
    domainEventIdentifier: string,
    contextInfo: { boundedContextName: string; moduleName: string },
  ): DomainEventTopicNodeBuilder {
    const topic = TopicUtils.generateDefaultDomainEventTopicName(
      domainEventIdentifier,
      contextInfo,
    );
    const topicExpressionNode = this.topicStringToExpressionNode(topic);
    this.expression = topicExpressionNode;
    return this;
  }

  private topicStringToExpressionNode(topic: string): ExpressionNode {
    const topicExpressionNode = ExpressionBuilderDirector.buildStringLiteralExpression(topic);
    return topicExpressionNode;
  }

  build(): DomainEventTopicNode {
    this.topicNode.addChild(this.expression);
    this.topicNode.buildObjectValue();
    return this.topicNode;
  }
}
