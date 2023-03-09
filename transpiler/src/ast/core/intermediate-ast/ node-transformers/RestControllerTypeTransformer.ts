import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TIntermediateASTApi } from '../../types.js';
import { IntermediateASTTree } from '../IntermediateASTTree.js';
import { RouterDefinitionNode } from '../nodes/setup/RouterDefinitionNode.js';
import { IASTToCompletedASTTransformer } from './index.js';

export class RestControllerTypeTransformer implements IASTToCompletedASTTransformer {
  constructor(
    protected setupTree: IntermediateASTTree,
    protected intermediateASTApi: TIntermediateASTApi,
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

        const apiDeclarationNode = controllerNode.getApi();
        const apiName = apiDeclarationNode.getApiIdentifier();

        if (this.intermediateASTApi && this.intermediateASTApi[apiName]) {
          const apiTree = this.intermediateASTApi[apiName];

          const restControllerNodeFound = apiTree.getControllerByIdentifier(
            identifierNode.getValue().RESTControllerIdentifier,
          );
          restControllerNodeFound.addChild(serverTypeNode);
          apiTree.buildValueRecursiveBottomUp(restControllerNodeFound);
        }
      }
    }
  }
}
