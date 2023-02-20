import { TopicUtils } from '../../../../../utils/topic.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { ExpressionBuilderDirector } from '../../directors/ExpressionDirector.js';
import { IBuilder } from '../IBuilder.js';
import { QueryTopicNode } from '../../nodes/query/QueryTopicNode.js';

export class QueryTopicNodeBuilder implements IBuilder<QueryTopicNode> {
  private topicNode: QueryTopicNode;
  private expression: ExpressionNode;
  constructor() {
    this.topicNode = new QueryTopicNode();
  }
  withExpression(expression: ExpressionNode): QueryTopicNodeBuilder {
    this.expression = expression;
    return this;
  }

  // convert camelCase to snake_case and remove the 'Command' suffix and upper case all letters
  public generateTopicName(
    commandIdentifier: string,
    contextInfo: { boundedContextName: string; moduleName: string },
  ): QueryTopicNodeBuilder {
    const topic = TopicUtils.generateDefaultQueryTopicName(commandIdentifier, contextInfo);
    const topicExpressionNode = this.topicStringToExpressionNode(topic);
    this.expression = topicExpressionNode;
    return this;
  }

  private topicStringToExpressionNode(topic: string): ExpressionNode {
    const topicExpressionNode = ExpressionBuilderDirector.buildStringLiteralExpression(topic);
    return topicExpressionNode;
  }

  build(): QueryTopicNode {
    this.topicNode.addChild(this.expression);
    this.topicNode.buildObjectValue();
    return this.topicNode;
  }
}
