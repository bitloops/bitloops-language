import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { ControllerInstanceNameNodeBuilder } from '../builders/setup/ControllerInstanceNameNodeBuilder.js';
import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { RouterDefinitionNode } from '../nodes/setup/RouterDefinitionNode.js';
import { IASTToCompletedASTTransformer } from './index.js';

export class RouterControllerNodesTransformer implements IASTToCompletedASTTransformer {
  constructor(protected tree: IntermediateASTTree) {}

  run(): void {
    this.addControllerInstanceNameToRouterControllers();
  }

  private addControllerInstanceNameToRouterControllers(): void {
    const routerDefinitionNodes = this.tree.getRootChildrenNodesByType(
      BitloopsTypesMapping.TRouterDefinition,
    ) as RouterDefinitionNode[];
    for (const routerDefinitionNode of routerDefinitionNodes) {
      const routerExpressionNode = routerDefinitionNode.getRouterExpression();
      const routerControllersNode = routerExpressionNode.getRouterControllers();
      const routerControllerNodes = routerControllersNode.getRouterControllerNodes();
      for (const routerControllerNode of routerControllerNodes) {
        const controllerIdentifierNode = routerControllerNode.getRouterControllerIdentifier();
        const controllerIdentifierName = controllerIdentifierNode.getIdentifierName();

        const controllerInstanceName = controllerIdentifierName; // TODO here change the name
        //     const controllerInstance =
        //   result.controllers?.[boundedContext]?.[module]?.[controllerClass] === undefined
        //     ? lowerCaseFirstLetter(controllerClass)
        //     : lowerCaseFirstLetter(controllerClass) +
        //       result.controllers[boundedContext][module][controllerClass].instances +
        //       1;
        const controllerInstanceNameNode = new ControllerInstanceNameNodeBuilder()
          .withInstanceName(controllerInstanceName)
          .build();
        routerControllerNode.addChild(controllerInstanceNameNode);
      }
    }
  }
}
