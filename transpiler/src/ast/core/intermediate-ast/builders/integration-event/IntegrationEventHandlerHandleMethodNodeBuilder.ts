import { IntegrationEventHandlerHandleMethodNode } from '../../nodes/integration-event/IntegrationEventHandlerHandleMethodNode.js';
import { IntegrationEventParameterNode } from '../../nodes/integration-event/IntegrationEventParameterNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { IBuilder } from '../IBuilder.js';

export class IntegrationEventHandlerHandleMethodNodeBuilder
  implements IBuilder<IntegrationEventHandlerHandleMethodNode>
{
  private eventHandleNode: IntegrationEventHandlerHandleMethodNode;
  private parameter: IntegrationEventParameterNode;
  private statementList: StatementListNode;
  private returnType: ReturnOkErrorTypeNode;

  constructor(metadata?: TNodeMetadata) {
    this.eventHandleNode = new IntegrationEventHandlerHandleMethodNode(metadata);
  }

  public withParameter(
    parameter: IntegrationEventParameterNode,
  ): IntegrationEventHandlerHandleMethodNodeBuilder {
    this.parameter = parameter;
    return this;
  }

  public withStatementList(
    statementList: StatementListNode,
  ): IntegrationEventHandlerHandleMethodNodeBuilder {
    this.statementList = statementList;
    return this;
  }

  public withReturnType(
    returnType: ReturnOkErrorTypeNode,
  ): IntegrationEventHandlerHandleMethodNodeBuilder {
    this.returnType = returnType;
    return this;
  }

  public build(): IntegrationEventHandlerHandleMethodNode {
    this.eventHandleNode.addChild(this.statementList);
    this.eventHandleNode.addChild(this.parameter);
    this.eventHandleNode.addChild(this.returnType);

    this.eventHandleNode.buildObjectValue();

    return this.eventHandleNode;
  }
}
