import { EventHandleNode } from '../nodes/EventHandleNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { ParameterNode } from '../nodes/ParameterList/ParameterNode.js';
import { StatementListNode } from '../nodes/statements/StatementList.js';
import { IBuilder } from './IBuilder.js';

export class EventHandlerHandleMethodNodeBuilder implements IBuilder<EventHandleNode> {
  private domainEventHandleNode: EventHandleNode;
  private parameter: ParameterNode;
  private statementList: StatementListNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainEventHandleNode = new EventHandleNode(metadata);
  }

  public withParameter(parameter: ParameterNode): EventHandlerHandleMethodNodeBuilder {
    this.parameter = parameter;
    return this;
  }

  public withStatementList(statementList: StatementListNode): EventHandlerHandleMethodNodeBuilder {
    this.statementList = statementList;
    return this;
  }

  public build(): EventHandleNode {
    this.domainEventHandleNode.addChild(this.statementList);
    this.domainEventHandleNode.addChild(this.parameter);

    this.domainEventHandleNode.buildObjectValue();

    return this.domainEventHandleNode;
  }
}
