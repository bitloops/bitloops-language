import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TBoundedContexts } from '../../types.js';
import { RouterControllerNodeBuilder } from '../builders/setup/RouterControllerNodeBuilder.js';
import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { RouterControllerNode } from '../nodes/setup/RouterControllerNode.js';
import { IASTToCompletedASTTransformer } from './index.js';

export class RestControllerTypeTransformer implements IASTToCompletedASTTransformer {
  constructor(
    protected setupTree: IntermediateASTTree,
    protected intermediateASTCore: TBoundedContexts,
  ) {}

  run(): void {
    this.restControllerTypeToASTCore();
  }

  private restControllerTypeToASTCore(): void {
    const routerControllerNodes = this.setupTree.getRootChildrenNodesByType(
      BitloopsTypesMapping.TRouterController,
    ) as RouterControllerNode[];

    for (const routerControllerNode of routerControllerNodes) {
      const serverTypeNode = routerControllerNode.getServerType();

      const argumentsNode = routerControllerNode.getArgumentsNode();
      const pathNode = routerControllerNode.getPathNode();
      const methodNode = routerControllerNode.getMethodNode();
      const identifierNode = routerControllerNode.getRouterControllerIdentifier();

      const boundedContextModuleNode = routerControllerNode.getBoundedContextModule();
      const moduleNode = boundedContextModuleNode.getModule();
      const boundedContextNode = boundedContextModuleNode.getBoundedContext();
      const moduleName = moduleNode.getName();
      const boundedContextName = boundedContextNode.getName();

      if (
        this.intermediateASTCore &&
        this.intermediateASTCore[boundedContextName] &&
        this.intermediateASTCore[boundedContextName][moduleName]
      ) {
        const metadata = routerControllerNode.getMetadata();
        new RouterControllerNodeBuilder(metadata)
          .withServerType(serverTypeNode)
          .withArguments(argumentsNode)
          .withControllerIdentifier(identifierNode)
          .withBoundedContextModule(boundedContextModuleNode)
          .withPath(pathNode)
          .withMethod(methodNode)
          .build();
      }
    }
  }
}
