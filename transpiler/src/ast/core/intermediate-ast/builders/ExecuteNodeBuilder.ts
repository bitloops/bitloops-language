import { TNodeMetadata } from '../nodes/IntermediateASTNode.js';
import { ParameterNode } from '../nodes/ParameterList/ParameterNode.js';
import { ReturnOkErrorTypeNode } from '../nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { StatementListNode } from '../nodes/statements/StatementList.js';
import { ExecuteNode } from '../nodes/ExecuteNode.js';
import { IBuilder } from './IBuilder.js';

export class ExecuteNodeBuilder implements IBuilder<ExecuteNode> {
  private parameter?: ParameterNode;
  private statementList: StatementListNode;
  private returnType: ReturnOkErrorTypeNode;
  private useCaseExecuteNode: ExecuteNode;

  constructor(metadata?: TNodeMetadata) {
    this.useCaseExecuteNode = new ExecuteNode(metadata);
  }

  public withParameter(parameter: ParameterNode): ExecuteNodeBuilder {
    this.parameter = parameter;
    return this;
  }

  public withStatementList(statementList: StatementListNode): ExecuteNodeBuilder {
    this.statementList = statementList;
    return this;
  }

  public withReturnType(returnType: ReturnOkErrorTypeNode): ExecuteNodeBuilder {
    this.returnType = returnType;
    return this;
  }

  public build(): ExecuteNode {
    this.useCaseExecuteNode.addChild(this.statementList);
    this.useCaseExecuteNode.addChild(this.returnType);
    if (this.parameter) this.useCaseExecuteNode.addChild(this.parameter);

    this.useCaseExecuteNode.buildObjectValue();

    return this.useCaseExecuteNode;
  }
}
