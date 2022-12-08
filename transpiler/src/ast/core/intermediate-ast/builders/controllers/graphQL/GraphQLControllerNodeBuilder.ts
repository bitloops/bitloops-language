import { IntermediateASTTree } from '../../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';
import { ParameterListNode } from '../../../nodes/ParameterList/ParameterListNode.js';
import { GraphQLControllerIdentifierNode } from '../../../nodes/controllers/graphql/GraphQLControllerIdentifierNode.js';
import { GraphQLOperationTypeNode } from '../../../nodes/controllers/graphql/GraphQLOperationTypeNode.js';
import { GraphQLOperationNameNode } from '../../../nodes/controllers/graphql/GraphQLOperationNameNode.js';
import { GraphQLControllerExecuteNode } from '../../../nodes/controllers/graphql/GraphQLControllerExecuteNode.js';
import { GraphQLInputTypeNode } from '../../../nodes/controllers/graphql/GraphQLInputTypeNode.js';
import { GraphQLControllerNode } from '../../../nodes/controllers/graphql/GraphQLControllerNode.js';
import { GraphQLOperationNameNodeBuilder } from './GraphQLOperationNameNodeBuilder.js';

export class GraphQLControllerNodeBuilder implements IBuilder<GraphQLControllerNode> {
  private graphQLControllerNode: GraphQLControllerNode;
  private graphQLControllerIdentifierNode: GraphQLControllerIdentifierNode;
  private parameters: ParameterListNode;
  private inputTypeNode: GraphQLInputTypeNode;
  private operationTypeNode: GraphQLOperationTypeNode;
  private operationNameNode: GraphQLOperationNameNode;
  private executeNode: GraphQLControllerExecuteNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.graphQLControllerNode = new GraphQLControllerNode(metadata);
  }

  public withIdentifier(
    identifierNode: GraphQLControllerIdentifierNode,
  ): GraphQLControllerNodeBuilder {
    this.graphQLControllerIdentifierNode = identifierNode;
    const controllerName = identifierNode.getIdentifierName();
    this.graphQLControllerNode.setClassName(controllerName);
    return this;
  }

  public withDependencies(parametersList: ParameterListNode): GraphQLControllerNodeBuilder {
    this.parameters = parametersList;
    return this;
  }
  withInputType(inputType: GraphQLInputTypeNode): GraphQLControllerNodeBuilder {
    this.inputTypeNode = inputType;
    return this;
  }

  withOperationType(operationType: GraphQLOperationTypeNode): GraphQLControllerNodeBuilder {
    this.operationTypeNode = operationType;
    return this;
  }

  public withExecuteNode(executeNode: GraphQLControllerExecuteNode): GraphQLControllerNodeBuilder {
    this.executeNode = executeNode;
    return this;
  }

  public build(): GraphQLControllerNode {
    this.intermediateASTTree.insertChild(this.graphQLControllerNode);
    this.intermediateASTTree.insertChild(this.graphQLControllerIdentifierNode);
    this.intermediateASTTree.insertSibling(this.parameters);
    this.intermediateASTTree.insertSibling(this.inputTypeNode);
    this.intermediateASTTree.insertSibling(this.operationTypeNode);
    this.intermediateASTTree.insertSibling(this.executeNode);

    this.generateOperationName();
    this.intermediateASTTree.insertSibling(this.operationNameNode);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.graphQLControllerNode.buildObjectValue();

    return this.graphQLControllerNode;
  }

  private generateOperationName(): void {
    const operationName = this.getOperationName(
      this.graphQLControllerIdentifierNode.getIdentifierName(),
    );
    this.operationNameNode = new GraphQLOperationNameNodeBuilder()
      .withOperationName(operationName)
      .build();
  }
  // Operation name is auto-generated from the controller name
  private getOperationName = (controllerName: string): string => {
    const suffixLength = 'Controller'.length;
    const operationNamePascal = controllerName.substring(0, controllerName.length - suffixLength);
    const operationName =
      operationNamePascal.charAt(0).toLowerCase() + operationNamePascal.slice(1);
    return operationName;
  };
}
