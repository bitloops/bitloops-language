import { DomainEventHandleNode } from '../../nodes/DomainEventHandler/DomainEventHandleNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterNode } from '../../nodes/ParameterList/ParameterNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { IBuilder } from '../IBuilder.js';

export class DomainEventHandlerHandleMethodNodeBuilder implements IBuilder<DomainEventHandleNode> {
  private domainEventHandleNode: DomainEventHandleNode;
  private parameter: ParameterNode;
  private statementList: StatementListNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainEventHandleNode = new DomainEventHandleNode(metadata);
  }

  public withParameter(parameter: ParameterNode): DomainEventHandlerHandleMethodNodeBuilder {
    this.parameter = parameter;
    return this;
  }

  public withStatementList(
    statementList: StatementListNode,
  ): DomainEventHandlerHandleMethodNodeBuilder {
    this.statementList = statementList;
    return this;
  }

  public build(): DomainEventHandleNode {
    this.domainEventHandleNode.addChild(this.statementList);
    this.domainEventHandleNode.addChild(this.parameter);

    this.domainEventHandleNode.buildObjectValue();

    return this.domainEventHandleNode;
  }
}
