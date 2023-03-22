import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterNode } from '../../nodes/ParameterList/ParameterNode.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { UseCaseExecuteNode } from '../../nodes/UseCase/UseCaseExecuteNode.js';
import { IBuilder } from '../IBuilder.js';

export class UseCaseExecuteNodeBuilder implements IBuilder<UseCaseExecuteNode> {
  private parameter?: ParameterNode;
  private statementList: StatementListNode;
  private returnType: ReturnOkErrorTypeNode;
  private useCaseExecuteNode: UseCaseExecuteNode;

  constructor(metadata?: TNodeMetadata) {
    this.useCaseExecuteNode = new UseCaseExecuteNode(metadata);
  }

  public withParameter(parameter: ParameterNode): UseCaseExecuteNodeBuilder {
    this.parameter = parameter;
    return this;
  }

  public withStatementList(statementList: StatementListNode): UseCaseExecuteNodeBuilder {
    this.statementList = statementList;
    return this;
  }

  public withReturnType(returnType: ReturnOkErrorTypeNode): UseCaseExecuteNodeBuilder {
    this.returnType = returnType;
    return this;
  }

  public build(): UseCaseExecuteNode {
    this.useCaseExecuteNode.addChild(this.statementList);
    this.useCaseExecuteNode.addChild(this.returnType);
    if (this.parameter) this.useCaseExecuteNode.addChild(this.parameter);

    this.useCaseExecuteNode.buildObjectValue();

    return this.useCaseExecuteNode;
  }
}
