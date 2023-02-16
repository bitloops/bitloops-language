import { TopicUtils } from '../../../../../utils/topic.js';
import { CommandTopicNode } from '../../nodes/command/CommandTopicNode.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { ExpressionBuilderDirector } from '../../directors/ExpressionDirector.js';
import { IBuilder } from '../IBuilder.js';

export class CommandTopicNodeBuilder implements IBuilder<CommandTopicNode> {
  private topicNode: CommandTopicNode;
  private expression: ExpressionNode;
  constructor() {
    this.topicNode = new CommandTopicNode();
  }
  withExpression(expression: ExpressionNode): CommandTopicNodeBuilder {
    this.expression = expression;
    return this;
  }

  // convert camelCase to snake_case and remove the 'Command' suffix and upper case all letters
  public generateTopicName(
    commandIdentifier: string,
    contextInfo: { boundedContextName: string; moduleName: string },
  ): CommandTopicNodeBuilder {
    const topic = TopicUtils.generateDefaultCommandTopicName(commandIdentifier, contextInfo);
    const topicExpressionNode = this.topicStringToExpressionNode(topic);
    this.expression = topicExpressionNode;
    return this;
  }

  private topicStringToExpressionNode(topic: string): ExpressionNode {
    const topicExpressionNode = ExpressionBuilderDirector.buildStringLiteralExpression(topic);
    return topicExpressionNode;
  }

  build(): CommandTopicNode {
    this.topicNode.addChild(this.expression);
    this.topicNode.buildObjectValue();
    return this.topicNode;
  }
}
