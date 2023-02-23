import { IntermediateASTTree } from '../../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';
import { ConfigBusesInvocationNode } from '../../../nodes/setup/config/ConfigBusesInvocationNode.js';
import { ConfigCommandBusNode } from '../../../nodes/setup/config/ConfigCommandBusNode.js';
import { ConfigIntegrationEventBusNode } from '../../../nodes/setup/config/ConfigIntegrationEventBusNode.js';
import { ConfigEventBusNode } from '../../../nodes/setup/config/ConfigEventBusNode.js';
import { ConfigQueryBusNode } from '../../../nodes/setup/config/ConfigQueryBusNode.js';

export class ConfigBusesInvocationNodeBuilder implements IBuilder<ConfigBusesInvocationNode> {
  private configBusesInvocationNode: ConfigBusesInvocationNode;
  private configCommandBusNode: ConfigCommandBusNode;
  private configQueryBusNode: ConfigQueryBusNode;
  private configEventBusNode: ConfigEventBusNode;
  private configIntegrationEventBusNode: ConfigIntegrationEventBusNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.configBusesInvocationNode = new ConfigBusesInvocationNode(metadata);
  }

  public withCommandBus(
    configCommandBusNode: ConfigCommandBusNode,
  ): ConfigBusesInvocationNodeBuilder {
    this.configCommandBusNode = configCommandBusNode;
    return this;
  }

  public withQueryBus(configQueryBusNode: ConfigQueryBusNode): ConfigBusesInvocationNodeBuilder {
    this.configQueryBusNode = configQueryBusNode;
    return this;
  }

  public withEventBus(configEventBusNode: ConfigEventBusNode): ConfigBusesInvocationNodeBuilder {
    this.configEventBusNode = configEventBusNode;
    return this;
  }

  public withIntegrationEventBus(
    configIntegrationEventBusNode: ConfigIntegrationEventBusNode,
  ): ConfigBusesInvocationNodeBuilder {
    this.configIntegrationEventBusNode = configIntegrationEventBusNode;
    return this;
  }

  private insertChildOrSibling(
    childAdded: boolean,
    node?:
      | ConfigCommandBusNode
      | ConfigQueryBusNode
      | ConfigEventBusNode
      | ConfigIntegrationEventBusNode,
  ): boolean {
    if (!node) {
      return childAdded;
    }
    if (!childAdded) {
      this.intermediateASTTree.insertChild(node);
      return true;
    }
    this.intermediateASTTree.insertSibling(node);
    return childAdded;
  }

  public build(): ConfigBusesInvocationNode {
    this.intermediateASTTree.insertChild(this.configBusesInvocationNode);
    let childAdded = false;
    childAdded = this.insertChildOrSibling(childAdded, this.configCommandBusNode);
    childAdded = this.insertChildOrSibling(childAdded, this.configQueryBusNode);
    childAdded = this.insertChildOrSibling(childAdded, this.configEventBusNode);
    this.insertChildOrSibling(childAdded, this.configIntegrationEventBusNode);

    this.intermediateASTTree.setCurrentNodeToRoot();

    this.configBusesInvocationNode.buildObjectValue();

    return this.configBusesInvocationNode;
  }
}
