import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTTree } from './IntermediateASTTree.js';
import { IntermediateASTNode, TNodeType } from './nodes/IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from './nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ReturnOKErrorNodeTransformer } from './ node-transformers/ReturnOkErrorNodeTransformer.js';
import { IASTToCompletedASTTransformer } from './ node-transformers/index.js';
import {
  IntermediateAST,
  IntermediateASTSetup,
  TBoundedContexts,
  TIntermediateASTApi,
} from '../types.js';
import { RouterControllerNodesTransformer } from './ node-transformers/RouterControllerNodesTransformer.js';
import { RestControllerTypeTransformer } from './ node-transformers/RestControllerTypeTransformer.js';
import { RepoAdapterNodesTransformer } from './ node-transformers/RepoAdapterNodesTransformer.js';
import { DomainEventHandlerNodeTransformer } from './ node-transformers/DomainEventHandlerNodeTransformer.js';
import { DomainEventHandlerDeclarationNode } from './nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { IntegrationEventHandlerDeclarationNode } from './nodes/integration-event/IntegrationEventHandlerDeclarationNode.js';
import { IntegrationEventHandlerNodeTransformer } from './ node-transformers/IntegrationEventHandlerNodeTransformer.js';
import { IntegrationEventNode } from './nodes/integration-event/IntegrationEventNode.js';
import { IntegrationEventNodeTransformer } from './ node-transformers/IntegrationEventNodeTransformer.js';
import { ControllerNode } from './nodes/controllers/ControllerNode.js';
import { ControllerNodeTransformer } from './ node-transformers/ControllerNodeTransformer.js';
import { AddDIsForAutoDomainEventHandlersTransformer } from './ node-transformers/setup/AddDIForAutoEventHandlers.js';

export class IntermediateASTToCompletedIntermediateASTTransformer {
  complete(intermediateAST: IntermediateAST): IntermediateAST {
    const { core, setup, api } = intermediateAST;
    const intermediateASTCore = core ? this.completeCore(core) : core;
    const intermediateASTSetup = setup ? this.completeSetup(setup) : setup;
    const intermediateASTApi = api;

    if (setup && core) {
      this.completeCoreFromSetup(intermediateASTCore, intermediateASTSetup);
      this.completeSetupFromCores(intermediateASTSetup, intermediateASTCore);
    }

    if (setup && api) {
      this.completeApiFromSetup(intermediateASTApi, intermediateASTSetup);
    }

    return {
      core: intermediateASTCore,
      api: intermediateASTApi,
      setup: intermediateASTSetup,
    };
  }

  private completeCore(core: TBoundedContexts): TBoundedContexts {
    let boundedContexts: TBoundedContexts = {};
    for (const [boundedContextName, boundedContext] of Object.entries(core)) {
      for (const [moduleName, ASTTree] of Object.entries(boundedContext)) {
        const treeUpdated = ASTTree.copy(); // TODO implement copy method
        const rootNode = treeUpdated.getRootNode();
        treeUpdated.traverse(rootNode, (node: IntermediateASTNode) => {
          const transformer = this.getNodeTransformer({
            intermediateASTNode: node,
            intermediateASTTree: treeUpdated,
          });

          if (transformer) {
            transformer.run();
          }
        });
        treeUpdated.buildValueRecursiveBottomUp(rootNode);

        if (!boundedContexts) {
          boundedContexts = {
            [boundedContextName]: {
              [moduleName]: treeUpdated,
            },
          };
        } else if (!boundedContexts[boundedContextName]) {
          boundedContexts[boundedContextName] = {
            [moduleName]: treeUpdated,
          };
        } else if (!boundedContexts[boundedContextName][moduleName]) {
          boundedContexts[boundedContextName][moduleName] = treeUpdated;
        }
      }
    }
    return boundedContexts;
  }

  private completeSetup(setup: IntermediateASTSetup): IntermediateASTSetup {
    let intermediateASTSetup: IntermediateASTSetup;
    for (const [fileId, setupTree] of Object.entries(setup)) {
      const treeUpdated = setupTree.copy(); // TODO implement copy method
      const rootNode = treeUpdated.getRootNode();

      const routerControllerNodesTransformer = new RouterControllerNodesTransformer(treeUpdated);
      routerControllerNodesTransformer.run();

      treeUpdated.buildValueRecursiveBottomUp(rootNode);

      if (!intermediateASTSetup) {
        intermediateASTSetup = {
          [fileId]: treeUpdated,
        };
      } else if (!intermediateASTSetup[fileId]) {
        intermediateASTSetup[fileId] = treeUpdated;
      }
    }
    return intermediateASTSetup;
  }

  // It mutates intermediateAST core
  private completeCoreFromSetup(
    intermediateASTCore: TBoundedContexts,
    intermediateASTSetup: IntermediateASTSetup,
  ): void {
    for (const setupTree of Object.values(intermediateASTSetup)) {
      const injectRepoAdaptersTransformer = new RepoAdapterNodesTransformer(
        setupTree,
        intermediateASTCore,
      );
      injectRepoAdaptersTransformer.run();
    }
  }

  // It mutates intermediateAST api
  private completeApiFromSetup(
    intermediateASTApi: TIntermediateASTApi,
    intermediateASTSetup: IntermediateASTSetup,
  ): void {
    for (const setupTree of Object.values(intermediateASTSetup)) {
      const restControllerTypeTransformer = new RestControllerTypeTransformer(
        setupTree,
        intermediateASTApi,
      );
      restControllerTypeTransformer.run();
    }
  }

  // It mutates intermediateAST setup
  private completeSetupFromCores(setup: IntermediateASTSetup, core: TBoundedContexts): void {
    let intermediateASTSetup: IntermediateASTSetup;
    for (const [fileId, setupTree] of Object.entries(setup)) {
      const treeUpdated = setupTree.copy(); // TODO implement copy method
      const rootNode = treeUpdated.getRootNode();

      const routerControllerNodesTransformer = new AddDIsForAutoDomainEventHandlersTransformer(
        treeUpdated,
        core,
      );
      routerControllerNodesTransformer.run();

      treeUpdated.buildValueRecursiveBottomUp(rootNode);

      if (!intermediateASTSetup) {
        intermediateASTSetup = {
          [fileId]: treeUpdated,
        };
      } else if (!intermediateASTSetup[fileId]) {
        intermediateASTSetup[fileId] = treeUpdated;
      }
    }
  }

  private getNodeTransformer(factoryParams: {
    intermediateASTNode: IntermediateASTNode;
    intermediateASTTree: IntermediateASTTree;
  }): IASTToCompletedASTTransformer | null {
    const { intermediateASTNode, intermediateASTTree } = factoryParams;

    const type: TNodeType = intermediateASTNode.getNodeType();

    switch (type) {
      case BitloopsTypesMapping.TOkErrorReturnType: {
        const returnOkErrorNode = intermediateASTNode as ReturnOkErrorTypeNode;
        return new ReturnOKErrorNodeTransformer(intermediateASTTree, returnOkErrorNode);
      }
      case BitloopsTypesMapping.TDomainEventHandler: {
        const domainEventHandlerNode = intermediateASTNode as DomainEventHandlerDeclarationNode;
        return new DomainEventHandlerNodeTransformer(intermediateASTTree, domainEventHandlerNode);
      }
      case BitloopsTypesMapping.TIntegrationEventHandler: {
        const integrationEventHandlerNode =
          intermediateASTNode as IntegrationEventHandlerDeclarationNode;
        return new IntegrationEventHandlerNodeTransformer(
          intermediateASTTree,
          integrationEventHandlerNode,
        );
      }
      case BitloopsTypesMapping.TIntegrationEvent: {
        const integrationEventNode = intermediateASTNode as IntegrationEventNode;
        return new IntegrationEventNodeTransformer(intermediateASTTree, integrationEventNode);
      }
      case BitloopsTypesMapping.TGraphQLController:
      case BitloopsTypesMapping.TRESTController: {
        const controllerNode = intermediateASTNode as ControllerNode;
        return new ControllerNodeTransformer(intermediateASTTree, controllerNode);
      }
      default:
        return null;
    }
  }
}
