import { ParameterIdentifierNode } from './../../nodes/ParameterList/ParameterIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IntegrationEventParameterNode } from '../../nodes/integration-event/IntegrationEventParameterNode.js';
import { IntegrationEventIdentifierNode } from '../../nodes/integration-event/IntegrationEventIdentifierNode.js';
import { BoundedContextModuleNode } from '../../nodes/setup/BoundedContextModuleNode.js';

export class IntegrationEventParameterNodeBuilder
  implements IBuilder<IntegrationEventParameterNode>
{
  private parameterNode: IntegrationEventParameterNode;
  private integrationTypeIdentifier: IntegrationEventIdentifierNode;
  private parameterIdentifierNode: ParameterIdentifierNode;
  private boundedContextModuleNode: BoundedContextModuleNode;

  constructor(metadata?: TNodeMetadata) {
    this.parameterNode = new IntegrationEventParameterNode(metadata);
  }

  public withIntegrationTypeIdentifier(
    integrationTypeIdentifier: IntegrationEventIdentifierNode,
  ): IntegrationEventParameterNodeBuilder {
    this.integrationTypeIdentifier = integrationTypeIdentifier;
    return this;
  }

  public withIdentifier(
    parameterIdentifierNode: ParameterIdentifierNode,
  ): IntegrationEventParameterNodeBuilder {
    this.parameterIdentifierNode = parameterIdentifierNode;
    return this;
  }

  public withBoundedContextModule(
    boundedContextModuleNode: BoundedContextModuleNode,
  ): IntegrationEventParameterNodeBuilder {
    this.boundedContextModuleNode = boundedContextModuleNode;
    return this;
  }

  public build(): IntegrationEventParameterNode {
    this.parameterNode.addChild(this.integrationTypeIdentifier);
    this.parameterNode.addChild(this.parameterIdentifierNode);
    this.parameterNode.addChild(this.boundedContextModuleNode);
    this.parameterNode.buildObjectValue();

    return this.parameterNode;
  }
}
