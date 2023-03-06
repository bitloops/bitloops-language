import { IntermediateASTTree } from '../../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';
import { DependencyInjectionsNode } from '../../../nodes/setup/dependency-injections/DependencyInjectionsNode.js';
import { DependencyInjectionNode } from '../../../nodes/setup/dependency-injections/DependencyInjectionNode.js';

export class DependencyInjectionsNodeBuilder implements IBuilder<DependencyInjectionsNode> {
  private dependencyInjectionsNode: DependencyInjectionsNode;
  private dependencyInjectionNodes: DependencyInjectionNode[];

  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, metadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.dependencyInjectionsNode = new DependencyInjectionsNode(metadata);
  }

  public withDependencyInjections(
    fields: DependencyInjectionNode[],
  ): DependencyInjectionsNodeBuilder {
    this.dependencyInjectionNodes = fields;
    return this;
  }

  // public build(): DependencyInjectionsNode {
  //   this.intermediateASTTree.insertChild(this.dependencyInjectionsNode);
  // let childAdded = false;
  //   childAdded = this.insertChildOrSibling(childAdded, this.configCommandBusNode);
  //   childAdded = this.insertChildOrSibling(childAdded, this.configQueryBusNode);
  //   childAdded = this.insertChildOrSibling(childAdded, this.configEventBusNode);
  //   this.insertChildOrSibling(childAdded, this.configIntegrationEventBusNode);

  //   this.intermediateASTTree.setCurrentNodeToRoot();

  //   this.dependencyInjectionsNode.buildObjectValue();

  //   return this.dependencyInjectionsNode;
  // }

  public build(): DependencyInjectionsNode {
    this.intermediateASTTree.insertChild(this.dependencyInjectionsNode);
    if (this.dependencyInjectionNodes) {
      this.dependencyInjectionNodes.forEach((fieldNode) => {
        this.dependencyInjectionsNode.addChild(fieldNode);
      });
    }

    this.intermediateASTTree.setCurrentNodeToRoot();
    this.dependencyInjectionsNode.buildArrayValue();

    return this.dependencyInjectionsNode;
  }
}
