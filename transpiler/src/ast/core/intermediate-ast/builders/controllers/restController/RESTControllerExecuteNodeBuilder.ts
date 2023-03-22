import { RESTControllerExecuteDependenciesNode } from '../../../nodes/controllers/restController/RESTControllerExecuteDependenciesNode.js';
import { RESTControllerExecuteNode } from '../../../nodes/controllers/restController/RESTControllerExecuteNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { StatementListNode } from '../../../nodes/statements/StatementList.js';
import { IBuilder } from '../../IBuilder.js';

export class RESTControllerExecuteNodeBuilder implements IBuilder<RESTControllerExecuteNode> {
  private restControllerExecute: RESTControllerExecuteNode;
  private executeDependenciesNode?: RESTControllerExecuteDependenciesNode;
  private statements: StatementListNode;

  constructor(metadata?: TNodeMetadata) {
    this.restControllerExecute = new RESTControllerExecuteNode(metadata);
  }

  public withDependencies(
    constantListNode: RESTControllerExecuteDependenciesNode,
  ): RESTControllerExecuteNodeBuilder {
    this.executeDependenciesNode = constantListNode;
    return this;
  }

  public withStatementList(statements: StatementListNode): RESTControllerExecuteNodeBuilder {
    this.statements = statements;
    return this;
  }

  public build(): RESTControllerExecuteNode {
    this.restControllerExecute.addChild(this.statements);
    this.restControllerExecute.addChild(this.executeDependenciesNode);

    this.restControllerExecute.buildObjectValue();

    return this.restControllerExecute;
  }
}
