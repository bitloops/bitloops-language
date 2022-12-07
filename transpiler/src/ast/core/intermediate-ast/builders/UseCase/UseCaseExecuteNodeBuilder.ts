import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { ReturnOkErrorTypeNode } from '../../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { UseCaseExecuteNode } from '../../nodes/UseCase/UseCaseExecuteNode.js';
import { IBuilder } from '../IBuilder.js';

export class UseCaseExecuteNodeBuilder implements IBuilder<UseCaseExecuteNode> {
  private parameterList: ParameterListNode;
  private statementList: StatementListNode;
  private returnType: ReturnOkErrorTypeNode;
  private useCaseExecuteNode: UseCaseExecuteNode;

  constructor(metadata?: TNodeMetadata) {
    this.useCaseExecuteNode = new UseCaseExecuteNode(metadata);
  }

  public withParameterList(parameterList: ParameterListNode): UseCaseExecuteNodeBuilder {
    this.parameterList = parameterList;
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
    this.useCaseExecuteNode.addChild(this.parameterList);
    this.useCaseExecuteNode.addChild(this.statementList);
    this.useCaseExecuteNode.addChild(this.returnType);

    this.useCaseExecuteNode.buildObjectValue();

    return this.useCaseExecuteNode;
  }
}
