import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { EventHandleNode } from '../../nodes/EventHandleNode.js';
import { IntegrationEventHandlerDeclarationNode } from '../../nodes/integration-event/IntegrationEventHandlerDeclarationNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ParameterListNode } from '../../nodes/ParameterList/ParameterListNode.js';
import { IBuilder } from '../IBuilder.js';
import { IntegrationEventHandlerIdentifierNode } from '../../nodes/integration-event/IntegrationEventHandlerIdentifierNode.js';
import { EvaluationFieldNode } from '../../nodes/Expression/Evaluation/EvaluationFieldList/EvaluationFieldNode.js';

export class IntegrationEventHandlerDeclarationNodeBuilder
  implements IBuilder<IntegrationEventHandlerDeclarationNode>
{
  private integrationEventHandlerNode: IntegrationEventHandlerDeclarationNode;
  private identifierNode: IntegrationEventHandlerIdentifierNode;
  private parameterListNode: ParameterListNode;
  private handleNode: EventHandleNode;
  private evaluationField: EvaluationFieldNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.integrationEventHandlerNode = new IntegrationEventHandlerDeclarationNode(metadata);
  }

  public withIdentifier(
    dtoIdentifierNode: IntegrationEventHandlerIdentifierNode,
  ): IntegrationEventHandlerDeclarationNodeBuilder {
    this.identifierNode = dtoIdentifierNode;
    const dtoName = dtoIdentifierNode.getIdentifierName();
    this.integrationEventHandlerNode.setClassName(dtoName);
    return this;
  }

  public withParameterList(
    parameterListNode: ParameterListNode,
  ): IntegrationEventHandlerDeclarationNodeBuilder {
    this.parameterListNode = parameterListNode;
    return this;
  }

  public withHandleMethod(handle: EventHandleNode): IntegrationEventHandlerDeclarationNodeBuilder {
    this.handleNode = handle;
    return this;
  }

  public withEventVersion(
    evaluationField: EvaluationFieldNode,
  ): IntegrationEventHandlerDeclarationNodeBuilder {
    this.evaluationField = evaluationField;
    return this;
  }

  public build(): IntegrationEventHandlerDeclarationNode {
    this.intermediateASTTree.insertChild(this.integrationEventHandlerNode);
    this.intermediateASTTree.insertChild(this.identifierNode);
    this.intermediateASTTree.insertSibling(this.parameterListNode);
    this.intermediateASTTree.insertSibling(this.handleNode);
    this.intermediateASTTree.insertSibling(this.evaluationField);

    this.intermediateASTTree.setCurrentNodeToRoot();
    this.integrationEventHandlerNode.buildObjectValue();

    return this.integrationEventHandlerNode;
  }
}
