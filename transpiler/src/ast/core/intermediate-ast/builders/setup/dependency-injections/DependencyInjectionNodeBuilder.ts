import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../../IBuilder.js';
import { DependencyInjectionNode } from '../../../nodes/setup/dependency-injections/DependencyInjectionNode.js';
import { IdentifierNode } from '../../../nodes/identifier/IdentifierNode.js';
import { ArgumentListNode } from '../../../nodes/ArgumentList/ArgumentListNode.js';
import { DependencyInjectionClassType } from '../../../nodes/setup/dependency-injections/DependencyInjectionClassType.js';

export class DependencyInjectionNodeBuilder implements IBuilder<DependencyInjectionNode> {
  private dependencyInjectionNode: DependencyInjectionNode;
  private type: DependencyInjectionClassType;
  private identifier: IdentifierNode;
  private argumentListNode: ArgumentListNode;

  constructor(metadata?: TNodeMetadata) {
    this.dependencyInjectionNode = new DependencyInjectionNode(metadata);
  }

  public withType(type: DependencyInjectionClassType): DependencyInjectionNodeBuilder {
    this.type = type;
    return this;
  }

  public withIdentifier(identifierNode: IdentifierNode): DependencyInjectionNodeBuilder {
    this.identifier = identifierNode;
    return this;
  }

  public withArguments(argumentListNode: ArgumentListNode): DependencyInjectionNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): DependencyInjectionNode {
    this.dependencyInjectionNode.addChild(this.type);
    this.dependencyInjectionNode.addChild(this.identifier);
    this.dependencyInjectionNode.addChild(this.argumentListNode);

    this.dependencyInjectionNode.buildObjectValue();

    return this.dependencyInjectionNode;
  }
}
