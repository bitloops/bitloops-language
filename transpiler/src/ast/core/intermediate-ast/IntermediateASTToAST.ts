import { BitloopsTypesMapping } from '../../../helpers/mappings.js';
import { TBoundedContexts } from '../../../types.js';
import { IntermediateASTTree } from './IntermediateASTTree.js';
import { IntermediateASTNode, TNodeType } from './nodes/IntermediateASTNode.js';
import { ReturnOkErrorTypeNode } from './nodes/returnOkErrorType/ReturnOkErrorTypeNode.js';
import { ReturnOKErrorNodeTransformer } from './ node-transformers/ReturnOkErrorNodeTransformer.js';
import { IASTToCompletedASTTransformer } from './ node-transformers/index.js';

export class IntermediateASTToCompletedIntermediateASTTransformer {
  complete(intermediateASTTree: TBoundedContexts): TBoundedContexts {
    let boundedContexts: TBoundedContexts;
    for (const [boundedContextName, boundedContext] of Object.entries(intermediateASTTree)) {
      for (const [moduleName, ASTTree] of Object.entries(boundedContext)) {
        const treeUpdated = ASTTree.copy();
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
