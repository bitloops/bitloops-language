import { EventHandleNode } from '../nodes/EventHandleNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { ParameterNode } from '../nodes/ParameterList/ParameterNode.js';
import { StatementListNode } from '../nodes/statements/StatementList.js';
import { IBuilder } from './IBuilder.js';

export class EventHandlerHandleMethodNodeBuilder implements IBuilder<EventHandleNode> {
  private eventHandleNode: EventHandleNode;
  private parameter: ParameterNode;
  private statementList: StatementListNode;

  constructor(metadata?: TNodeMetadata) {
    this.eventHandleNode = new EventHandleNode(metadata);
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
    this.eventHandleNode.addChild(this.statementList);
    this.eventHandleNode.addChild(this.parameter);

    this.eventHandleNode.buildObjectValue();

    return this.eventHandleNode;
  }
}
