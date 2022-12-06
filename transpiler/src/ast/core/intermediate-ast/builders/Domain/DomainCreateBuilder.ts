import { DomainCreateNode } from '../../nodes/Domain/DomainCreateNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { IBuilder } from '../IBuilder.js';

export class DomainCreateNodeBuilder implements IBuilder<DomainCreateNode> {
  private domainCreateNode: DomainCreateNode;
  private statementListNode?: StatementListNode;
  private returnTypeNode: ReturnOkErrorTypeNode;
  private parameterListNode?: ParameterListNode;

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

  public withParameters(parameterListNode: ParameterListNode): DomainCreateNodeBuilder {
    this.parameterListNode = parameterListNode;
    return this;
  }

  public build(): DomainCreateNode {
    this.domainCreateNode.addChild(this.returnTypeNode);
    if (this.statementListNode) this.domainCreateNode.addChild(this.statementListNode);
    if (this.parameterListNode) this.domainCreateNode.addChild(this.parameterListNode);

    this.domainCreateNode.buildObjectValue();

    return this.domainCreateNode;
  }
}
