import { GraphQLControllerExecuteDependenciesNode } from '../../../nodes/controllers/graphql/GraphQLControllerExecuteDependenciesNode.js';
import { GraphQLControllerExecuteNode } from '../../../nodes/controllers/graphql/GraphQLControllerExecuteNode.js';
import { GraphQLControllerExecuteReturnTypeNode } from '../../../nodes/controllers/graphql/GraphQLControllerExecuteReturnTypeNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { StatementListNode } from '../../../nodes/statements/StatementList.js';
import { IBuilder } from '../../IBuilder.js';

export class GraphQLControllerExecuteNodeBuilder implements IBuilder<GraphQLControllerExecuteNode> {
  private graphQLControllerExecute: GraphQLControllerExecuteNode;
  private executeDependenciesNode?: GraphQLControllerExecuteDependenciesNode;
  private statements: StatementListNode;
  private returnType: GraphQLControllerExecuteReturnTypeNode;

  constructor(metadata?: TNodeMetadata) {
    this.graphQLControllerExecute = new GraphQLControllerExecuteNode(metadata);
  }

  public withDependencies(
    constantListNode: GraphQLControllerExecuteDependenciesNode,
  ): GraphQLControllerExecuteNodeBuilder {
    this.executeDependenciesNode = constantListNode;
    return this;
  }

  public withStatementList(statements: StatementListNode): GraphQLControllerExecuteNodeBuilder {
    this.statements = statements;
    return this;
  }

  public withReturnType(
    returnType: GraphQLControllerExecuteReturnTypeNode,
  ): GraphQLControllerExecuteNodeBuilder {
    this.returnType = returnType;
    return this;
  }

  public build(): GraphQLControllerExecuteNode {
    this.graphQLControllerExecute.addChild(this.statements);
    this.graphQLControllerExecute.addChild(this.executeDependenciesNode);
    this.graphQLControllerExecute.addChild(this.returnType);

    this.graphQLControllerExecute.buildObjectValue();

    return this.graphQLControllerExecute;
  }
}
