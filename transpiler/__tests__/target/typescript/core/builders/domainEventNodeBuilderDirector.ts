import { DomainEventDeclarationNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/DomainEvent/DomainEventDeclarationNodeBuilder.js';
import { DomainEventIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/DomainEvent/DomainEventIdentifierNodeBuilder.js';
import { EntityIdentifierNodeBuilder } from '../../../../../src/ast/core/intermediate-ast/builders/Entity/EntityIdentifierBuilder.js';
import { IntermediateASTTree } from '../../../../../src/ast/core/intermediate-ast/IntermediateASTTree.js';
import { DomainEventDeclarationNode } from '../../../../../src/ast/core/intermediate-ast/nodes/DomainEvent/DomainEventDeclarationNode.js';
import { IntermediateASTRootNode } from '../../../../../src/ast/core/intermediate-ast/nodes/RootNode.js';

export class domainEventDeclarationNodeBuilderDirector {
  private builder: DomainEventDeclarationNodeBuilder;

  constructor() {
    const tree = new IntermediateASTTree(new IntermediateASTRootNode());
    this.builder = new DomainEventDeclarationNodeBuilder(tree);
  }

  buildDomainEvent(
    domainEventIdentifier: string,
    rootEntityIdentifier: string,
  ): DomainEventDeclarationNode {
    const identifierNode = new DomainEventIdentifierNodeBuilder()
      .withName(domainEventIdentifier)
      .build();

    const rootEntityIdentifierNode = new EntityIdentifierNodeBuilder()
      .withName(rootEntityIdentifier)
      .build();
    return this.builder
      .withIdentifier(identifierNode)
      .withEntityIdentifier(rootEntityIdentifierNode)
      .build();
  }
}
