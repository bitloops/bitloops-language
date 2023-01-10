import { BitloopsTypesMapping } from '../../../../helpers/mappings.js';
import { TBoundedContexts } from '../../types.js';
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
        const coreTree = this.intermediateASTCore[boundedContextName][moduleName];

        const restControllerNodeFound = coreTree.getControllerByIdentifier(
          identifierNode.getValue(),
        );
        restControllerNodeFound.addChild(serverTypeNode);

        // const metadata = routerControllerNode.getMetadata();
        //TODO delete the old one
        //   new RESTControllerNodeBuilder(
        //     this.intermediateASTCore[boundedContextName][moduleName],
        //     metadata,
        //   )
        //     .withServerTypeNode(serverTypeNode)
        //     .withIdentifier(identifierNode)
        //     // .withParameterList()
        //     // .withRESTMethod()
        //     // .withExecuteNode()
        //     .build();
      }
    }
  }
}
