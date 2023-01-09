import { RESTControllerNode } from '../../../nodes/controllers/restController/RESTControllerNode.js';
import { IntermediateASTTree } from '../../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';
import { RESTControllerIdentifierNode } from '../../../nodes/controllers/restController/RESTControllerIdentifierNode.js';
import { RESTControllerExecuteNode } from './../../../nodes/controllers/restController/RESTControllerExecuteNode.js';
import { ParameterListNode } from '../../../nodes/ParameterList/ParameterListNode.js';
import { RESTMethodNode } from './../../../nodes/controllers/restController/RESTMethodNode.js';

export class RESTControllerNodeBuilder implements IBuilder<RESTControllerNode> {
  private restControllerNode: RESTControllerNode;
  private restControllerIdentifierNode: RESTControllerIdentifierNode;
  private parameters: ParameterListNode;
  private restMethod: RESTMethodNode;
  private controllerExecuteNode: RESTControllerExecuteNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.restControllerNode = new RESTControllerNode(metadata);
  }

  public withIdentifier(identifierNode: RESTControllerIdentifierNode): RESTControllerNodeBuilder {
    this.restControllerIdentifierNode = identifierNode;
    const controllerName = identifierNode.getIdentifierName();
    this.restControllerNode.setClassName(controllerName);
    return this;
  }

  public withParameterList(parametersList: ParameterListNode): RESTControllerNodeBuilder {
    this.parameters = parametersList;
    return this;
  }

  public withRESTMethod(restMethod: RESTMethodNode): RESTControllerNodeBuilder {
    this.restMethod = restMethod;
    return this;
  }

  public withExecuteNode(
    controllerExecuteNode: RESTControllerExecuteNode,
  ): RESTControllerNodeBuilder {
    this.controllerExecuteNode = controllerExecuteNode;
    return this;
  }

  public build(): RESTControllerNode {
    this.intermediateASTTree.insertChild(this.restControllerNode);
    this.intermediateASTTree.insertChild(this.restControllerIdentifierNode);
    this.intermediateASTTree.insertSibling(this.parameters);
    this.intermediateASTTree.insertSibling(this.restMethod);
    this.intermediateASTTree.insertSibling(this.controllerExecuteNode);

    this.intermediateASTTree.setCurrentNodeToRoot();

    this.restControllerNode.buildObjectValue();

    return this.restControllerNode;
  }
}
