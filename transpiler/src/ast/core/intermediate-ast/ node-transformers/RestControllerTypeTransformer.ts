import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TBoundedContexts } from '../../types.js';
import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { RouterDefinitionNode } from '../nodes/setup/RouterDefinitionNode.js';
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
    const routerDefinitionNodes = this.setupTree.getRootChildrenNodesByType(
      BitloopsTypesMapping.TRouterDefinition,
    ) as RouterDefinitionNode[];

    for (const routerDefinition of routerDefinitionNodes) {
      const routerExpressionNode = routerDefinition.getRouterExpression();
      const routerArgumentNode = routerExpressionNode.getRouterArgumentsNode();

      const serverTypeNode = routerArgumentNode.getServerType();
      const controllersNode = routerExpressionNode.getRouterControllers();
      const controllerNodes = controllersNode.getRouterControllerNodes();

      for (const controllerNode of controllerNodes) {
        const identifierNode = controllerNode.getRouterControllerIdentifier();

        const boundedContextModuleNode = controllerNode.getBoundedContextModule();
        const moduleNode = boundedContextModuleNode.getModule();
        const boundedContextNode = boundedContextModuleNode.getBoundedContext();
        const moduleName = moduleNode.getName();
        const boundedContextName = boundedContextNode.getName();

        if (
          this.intermediateASTCore &&
          this.intermediateASTCore[boundedContextName] &&
          this.intermediateASTCore[boundedContextName][moduleName]
        ) {
          const coreTree = this.intermediateASTCore[boundedContextName][moduleName];

          const restControllerNodeFound = coreTree.getControllerByIdentifier(
            identifierNode.getValue().RESTControllerIdentifier,
          );
          restControllerNodeFound.addChild(serverTypeNode);
          this.intermediateASTCore[boundedContextName][moduleName].buildValueRecursiveBottomUp(
            restControllerNodeFound,
          );
        }
      }
    }
  }
}
