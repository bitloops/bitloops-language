import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { IntermediateASTTree } from './IntermediateASTTree.js';
import { IntermediateASTNode, TNodeType } from './nodes/IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from './nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ReturnOKErrorNodeTransformer } from './ node-transformers/ReturnOkErrorNodeTransformer.js';
import { IASTToCompletedASTTransformer } from './ node-transformers/index.js';
import { IntermediateAST, IntermediateASTSetup, TBoundedContexts } from '../types.js';
import { RouterControllerNodesTransformer } from './ node-transformers/RouterControllerNodesTransformer.js';
import { InjectRepoAdaptersTransformer } from './ node-transformers/InjectRepoAdaptersTransformer.js';
import { RestControllerTypeTransformer } from './ node-transformers/RestControllerTypeTransformer.js';

export class IntermediateASTToCompletedIntermediateASTTransformer {
  complete(intermediateAST: IntermediateAST): IntermediateAST {
    const boundedContexts = this.completeCore(intermediateAST.core);
    const intermediateASTSetup = intermediateAST.setup
      ? this.completeSetup(intermediateAST.setup)
      : intermediateAST.setup;
    if (intermediateAST.setup) {
      this.completeCoreFromSetup(intermediateAST);
    }
    return {
      core: boundedContexts,
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
  private completeCoreFromSetup(intermediateAST: IntermediateAST): void {
    for (const setupTree of Object.values(intermediateAST.setup)) {
      const rootNode = setupTree.getRootNode();

      const injectRepoAdaptersTransformer = new InjectRepoAdaptersTransformer(
        setupTree,
        intermediateAST.core,
      );
      injectRepoAdaptersTransformer.run();

      const restControllerTypeTransformer = new RestControllerTypeTransformer(
        setupTree,
        intermediateAST.core,
      );
      restControllerTypeTransformer.run();
      setupTree.buildValueRecursiveBottomUp(rootNode);
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
      default:
        return null;
    }
  }
}
