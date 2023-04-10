import { EventHandleNode } from '../nodes/EventHandleNode.js';
import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { ParameterNode } from '../nodes/ParameterList/ParameterNode.js';
import { ReturnOkErrorTypeNode } from '../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../nodes/statements/StatementList.js';
import { IBuilder } from './IBuilder.js';

export class EventHandlerHandleMethodNodeBuilder implements IBuilder<EventHandleNode> {
  private eventHandleNode: EventHandleNode;
  private parameter: ParameterNode;
  private statementList: StatementListNode;
  private returnType: ReturnOkErrorTypeNode;

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

  public withReturnType(returnType: ReturnOkErrorTypeNode): EventHandlerHandleMethodNodeBuilder {
    this.returnType = returnType;
    return this;
  }

  public build(): EventHandleNode {
    this.eventHandleNode.addChild(this.statementList);
    this.eventHandleNode.addChild(this.parameter);
    this.eventHandleNode.addChild(this.returnType);

    this.eventHandleNode.buildObjectValue();

    return this.eventHandleNode;
  }
}
