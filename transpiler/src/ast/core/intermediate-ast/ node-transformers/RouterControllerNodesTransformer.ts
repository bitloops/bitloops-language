import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { lowerCaseFirstLetter } from '../../../../helpers/stringManipulations.js';
import { ControllerInstanceNameNodeBuilder } from '../builders/setup/ControllerInstanceNameNodeBuilder.js';
import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { ControllerResolversNode } from '../nodes/setup/ControllerResolversNode.js';
import { GraphQLServerNode } from '../nodes/setup/GraphQLServerNode.js';
import { RouterDefinitionNode } from '../nodes/setup/RouterDefinitionNode.js';
import { IASTToCompletedASTTransformer } from './index.js';

export class RouterControllerNodesTransformer implements IASTToCompletedASTTransformer {
  constructor(protected tree: IntermediateASTTree) {}

  run(): void {
    this.addControllerInstanceNameToRouterControllers();
    this.addControllerInstanceNameToControllerResolver();
  }

  private addControllerInstanceNameToRouterControllers(): void {
    const routerDefinitionNodes = this.tree.getRootChildrenNodesByType(
      BitloopsTypesMapping.TRouterDefinition,
    ) as RouterDefinitionNode[];
    const controllerIdentifiers = {};
    for (const routerDefinitionNode of routerDefinitionNodes) {
      const routerExpressionNode = routerDefinitionNode.getRouterExpression();
      const routerControllersNode = routerExpressionNode.getRouterControllers();
      const routerControllerNodes = routerControllersNode.getRouterControllerNodes();
      for (const routerControllerNode of routerControllerNodes) {
        const controllerIdentifierNode = routerControllerNode.getRouterControllerIdentifier();
        const controllerIdentifierName = controllerIdentifierNode.getIdentifierName();

        this.calculateControllerInstances(controllerIdentifiers, controllerIdentifierName);
        const controllerInstances = this.getControllerInstances(
          controllerIdentifiers,
          controllerIdentifierName,
        );
        const controllerInstanceName =
          lowerCaseFirstLetter(controllerIdentifierName) + controllerInstances;
        const controllerInstanceNameNode = new ControllerInstanceNameNodeBuilder()
          .withInstanceName(controllerInstanceName)
          .build();
        routerControllerNode.addChild(controllerInstanceNameNode);
      }
    }
  }

  private calculateControllerInstances(
    controllerIdentifiers: { [identifier: string]: number },
    controllerIdentifierName: string,
  ): void {
    if (controllerIdentifiers[controllerIdentifierName] !== undefined) {
      controllerIdentifiers[controllerIdentifierName] += 1;
    } else {
      controllerIdentifiers[controllerIdentifierName] = 1;
    }
  }

  private getControllerInstances(
    controllerIdentifiers: { [identifier: string]: number },
    controllerIdentifierName: string,
  ): number {
    return controllerIdentifiers[controllerIdentifierName];
  }

  private addControllerInstanceNameToControllerResolver(): void {
    const graphQLServers = this.tree.getRootChildrenNodesByType(
      BitloopsTypesMapping.TGraphQLServerInstance,
    ) as GraphQLServerNode[];
    for (const graphQLServer of graphQLServers) {
      const controllerResolversNode: ControllerResolversNode =
        graphQLServer.getControllerResolvers();
      const controllerResolverNodes = controllerResolversNode.getControllerResolverNode();
      for (const controllerResolverNode of controllerResolverNodes) {
        const controllerResolverIdentifierNode =
          controllerResolverNode.getGraphQLControllerIdentifier();
        const controllerResolverIdentifierName =
          controllerResolverIdentifierNode.getIdentifierName();

        const controllerInstanceName = controllerResolverIdentifierName; // TODO here change the name
        //     const controllerInstance =
        //   result.controllers?.[boundedContext]?.[module]?.[controllerClass] === undefined
        //     ? lowerCaseFirstLetter(controllerClass)
        //     : lowerCaseFirstLetter(controllerClass) +
        //       result.controllers[boundedContext][module][controllerClass].instances +
        //       1;
        const controllerInstanceNameNode = new ControllerInstanceNameNodeBuilder()
          .withInstanceName(controllerInstanceName)
          .build();
        controllerResolverNode.addChild(controllerInstanceNameNode);
      }
    }
  }
}
