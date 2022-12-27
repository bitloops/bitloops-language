import { DomainCreateParameterNode } from '../../nodes/Domain/DomainCreateParameterNode.js';
import { DomainCreateNode } from '../../nodes/Domain/DomainCreateNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { IBuilder } from '../IBuilder.js';

export class DomainCreateNodeBuilder implements IBuilder<DomainCreateNode> {
  private domainCreateNode: DomainCreateNode;
  private statementListNode?: StatementListNode;
  private returnTypeNode: ReturnOkErrorTypeNode;
  private parameterNode: DomainCreateParameterNode;

  constructor(metadata?: TNodeMetadata) {
    this.domainCreateNode = new DomainCreateNode(metadata);
  }

  public withStatements(statementListNode: StatementListNode): DomainCreateNodeBuilder {
    this.statementListNode = statementListNode;
    return this;
  }

  public withReturnType(returnTypeNode: ReturnOkErrorTypeNode): DomainCreateNodeBuilder {
    this.returnTypeNode = returnTypeNode;
    return this;
  }

  public withParameter(parameterNode: DomainCreateParameterNode): DomainCreateNodeBuilder {
    this.parameterNode = parameterNode;
    return this;
  }

  public build(): DomainCreateNode {
    this.domainCreateNode.addChild(this.returnTypeNode);
    this.domainCreateNode.addChild(this.parameterNode);
    if (this.statementListNode) this.domainCreateNode.addChild(this.statementListNode);

    this.domainCreateNode.buildObjectValue();

    return this.domainCreateNode;
  }
}
