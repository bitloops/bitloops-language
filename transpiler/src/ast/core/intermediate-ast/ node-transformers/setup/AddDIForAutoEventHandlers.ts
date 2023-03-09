import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TBoundedContexts } from '../../../types.js';
import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { ArgumentListNodeBuilder } from '../../builders/ArgumentList/ArgumentListNodeBuilder.js';
import { IdentifierNodeBuilder } from '../../builders/identifier/IdentifierBuilder.js';
import { BoundedContextModuleNodeBuilder } from '../../builders/setup/BoundedContextModuleNodeBuilder.js';
import { BoundedContextNameNodeBuilder } from '../../builders/setup/BoundedContextNameNodeBuilder.js';
import { ModuleNameNodeBuilder } from '../../builders/setup/ModuleNameNodeBuilder.js';
import { WordsWithSpacesNodeBuilder } from '../../builders/setup/WordsWithSpacesNodeBuilder.js';
import { DependencyInjectionClassTypeBuilder } from '../../builders/setup/dependency-injections/DependencyInjectionClassTypeBuilder.js';
import { DependencyInjectionNodeBuilder } from '../../builders/setup/dependency-injections/DependencyInjectionNodeBuilder.js';
import { DependencyInjectionsNodeBuilder } from '../../builders/setup/dependency-injections/DependencyInjectionsNodeBuilder.js';
import { DomainEventHandlerDeclarationNode } from '../../nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { DomainEventHandlerIdentifierNode } from '../../nodes/DomainEventHandler/DomainEventHandlerIdentifierNode.js';
import { BoundedContextModuleNode } from '../../nodes/setup/BoundedContextModuleNode.js';
import { DependencyInjectionNode } from '../../nodes/setup/dependency-injections/DependencyInjectionNode.js';
import { IASTToCompletedASTTransformer } from '../index.js';

export class AddDIsForAutoDomainEventHandlersTransformer implements IASTToCompletedASTTransformer {
  constructor(private setupTree: IntermediateASTTree, private coreTrees: TBoundedContexts) {}

  run(): void {
    this.addControllerInstanceNameToRouterControllers();
  }

  private addControllerInstanceNameToRouterControllers(): void {
    // find all auto domain event handlers
    const dependencyInjectionsNode = this.getDependencyInjectionNode();
    for (const [boundedContextName, boundedContext] of Object.entries(this.coreTrees)) {
      for (const [moduleName, moduleTree] of Object.entries(boundedContext)) {
        const domainEventHandlers =
          moduleTree.getRootChildrenNodesByType<DomainEventHandlerDeclarationNode>(
            BitloopsTypesMapping.TDomainEventHandler,
          );

        for (const domainEventHandler of domainEventHandlers) {
          if (!domainEventHandler.isAutoDomainEventHandler) {
            continue;
          }
          const domainEventHandlerIdentifier = domainEventHandler.getIdentifier();
          // If it's an auto domain event handler, add it to the DI
          const dependencyInjectionNode = this.createDependencyInjectionNode(
            domainEventHandlerIdentifier,
            boundedContextName,
            moduleName,
          );

          dependencyInjectionsNode.addChild(dependencyInjectionNode);
        }
      }
    }
  }

  private getDependencyInjectionNode(): DependencyInjectionNode {
    const dependencyInjectionNode =
      this.setupTree.getRootChildrenNodesByType<DependencyInjectionNode>(
        BitloopsTypesMapping.TDependencyInjection,
      )?.[0];
    if (dependencyInjectionNode) return dependencyInjectionNode;

    return new DependencyInjectionsNodeBuilder(this.setupTree, null)
      .withDependencyInjections([])
      .build();
  }

  private createDependencyInjectionNode(
    domainEventHandlerIdentifier: DomainEventHandlerIdentifierNode,
    boundedContext: string,
    moduleName: string,
  ): DependencyInjectionNode {
    const type = new DependencyInjectionClassTypeBuilder().withType('EventHandler').build();
    // const domainEventIdentifier: DomainEventHandlerIdentifierNode = thisVisitor.visit(
    //   ctx.domainEventHandlerIdentifier(),
    // );
    const identifier = new IdentifierNodeBuilder(domainEventHandlerIdentifier.getMetadata())
      .withName(domainEventHandlerIdentifier.getIdentifierName())
      .build();

    const bcModuleNode: BoundedContextModuleNode = new BoundedContextModuleNodeBuilder()
      .withBoundedContext(
        new BoundedContextNameNodeBuilder()
          .withName(new WordsWithSpacesNodeBuilder().withName(boundedContext).build())
          .build(),
      )
      .withModule(
        new ModuleNameNodeBuilder()
          .withName(new WordsWithSpacesNodeBuilder().withName(moduleName).build())
          .build(),
      )
      .build();
    const argumentList = new ArgumentListNodeBuilder().withArguments([]).build();
    return new DependencyInjectionNodeBuilder(null)
      .withBoundedContextModule(bcModuleNode)
      .withType(type)
      .withIdentifier(identifier)
      .withArguments(argumentList)
      .build();
  }
}
